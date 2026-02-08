import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

const TRIGGER_RENTAL_COMLITED = `
CREATE OR REPLACE FUNCTION notify_rental_complited()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'completed' OR NEW.status = 'canceled' THEN
    UPDATE computers SET status = 'free' WHERE id = NEW."computerId";
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_rental_complited ON rentals;
CREATE TRIGGER trigger_rental_complited
  AFTER UPDATE ON rentals
  FOR EACH ROW
  EXECUTE PROCEDURE notify_rental_complited();
`;
const TRIGGER_RENTAL_PROHIBITION_SPROUT = `
CREATE OR REPLACE FUNCTION check_client_age_for_rental()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  client_birth_date DATE;
  client_age INTEGER;
  minuts INTEGER;
BEGIN
  SELECT "dateOfBirth" INTO client_birth_date 
  FROM visitors 
  WHERE id = NEW."visitorId";
  client_age := EXTRACT(YEAR FROM AGE(NOW(), client_birth_date));

  SELECT "timeMinutes" INTO minuts
  FROM package_service
  WHERE id = NEW."packageId";
  
  IF client_age < 14 AND minuts > (3 * 60) THEN
    RAISE EXCEPTION 'Client is under 14 years old (age: %)', client_age;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_age_before_rental_insert ON rentals;
CREATE TRIGGER check_age_before_rental_insert
  BEFORE INSERT ON rentals
  FOR EACH ROW
  EXECUTE PROCEDURE check_client_age_for_rental();

DROP TRIGGER IF EXISTS check_age_before_rental_update ON rentals;
CREATE TRIGGER check_age_before_rental_update
  BEFORE UPDATE ON rentals
  FOR EACH ROW
  EXECUTE PROCEDURE check_client_age_for_rental();
`;

@Injectable()
export class DatabaseTriggersService implements OnModuleInit {
    constructor(
        @InjectConnection()
        private readonly sequelize: Sequelize,
    ) { }

    async onModuleInit() {
        await this.runTriggers();
    }

    private async runTriggers() {
        try {
            await this.sequelize.query(TRIGGER_RENTAL_COMLITED);
            await this.sequelize.query(TRIGGER_RENTAL_PROHIBITION_SPROUT);
            console.log('[DatabaseTriggers] Triggers applied');
        } catch (err) {
            console.error('[DatabaseTriggers] Failed to apply triggers:', err);
            throw err;
        }
    }
}
