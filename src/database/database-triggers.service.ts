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
CREATE OR REPLACE FUNCTION notify_rental_prohibition_sprout()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF 
    EXTRACT(YEAR FROM AGE(NOW(), 
        SELECT dateOfBirth FROM visitors WHERE id = NEW."computerId"
    )) < 14 
      THEN
        RETURN NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_rental_prohibition_sprout ON rentals;
CREATE TRIGGER trigger_rental_prohibition_sprout
  BEFORE INSERT AND UPDATE ON rentals
  FOR EACH ROW
  EXECUTE PROCEDURE notify_rental_prohibition_sprout();
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
            console.log('[DatabaseTriggers] Triggers applied');
        } catch (err) {
            console.error('[DatabaseTriggers] Failed to apply triggers:', err);
            throw err;
        }
    }
}
