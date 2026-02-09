import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";


@Injectable()
export class DatabaseRequestService {

    constructor(@InjectConnection() private readonly sequelize: Sequelize) { }

    async getActivVisitorByAdminId(adminId: number) {
        const visitors = await this.sequelize.query(`
            SELECT DISTINCT
                v.*
            FROM visitors v
            INNER JOIN rentals r ON v.id = r."visitorId"
            WHERE r."adminId" = :adminId
                AND r.status = 'active'
            ORDER BY v."fullName";
        `, {
            replacements: { adminId },
            type: 'SELECT'
        });

        return visitors;
    }

    //	отобразить клиентов, арендующих компьютеры на 3 и более часа;
    async getVisitorsMoreThreeHours() {
        const visitors = await this.sequelize.query(`
            SELECT DISTINCT v.*
            FROM visitors v
            INNER JOIN rentals r ON v.id = r."visitorId"
            INNER JOIN package_service ps ON ps.id = r."packageId"
            WHERE ps."timeMinutes" >= (3 * 60)
                AND (r.status = 'active' OR r.status = 'waiting')
            ORDER BY v."fullName";
        `, {
            type: 'SELECT'
        });

        return visitors;
    }

    //	отобразить список клиентов, арендующих компьютеры в вечернее время;
    async getVisitorsEveningTime() {
        const visitors = await this.sequelize.query(`
            SELECT DISTINCT v.*
            FROM visitors v
            INNER JOIN rentals r ON v.id = r."visitorId"
            INNER JOIN package_service ps ON ps.id = r."packageId"
            WHERE ps."timeDay" = 'evening'
                AND (r.status = 'active' OR r.status = 'waiting')
            ORDER BY v."fullName";
        `, {
            type: 'SELECT'
        });

        return visitors;
    }

    //	получить среднее количество часов аренды и среднюю выручку для каждого пакета услуг (утреннего или вечернего) и для каждого периода аренды (1, 3, 5, 7 часов);
    async getAverageNumbers() {
        const result = await this.sequelize.query(`
            SELECT 
                "timeDay",
                AVG("timeMinutes") / 60.0 as avg_hours,
                AVG("price") as avg_price
            FROM package_service
            WHERE "timeDay" IN ('morning', 'afternoon', 'evening', 'night')
            GROUP BY "timeDay"
            ORDER BY 
                CASE "timeDay"
                    WHEN 'morning' THEN 1
                    WHEN 'afternoon' THEN 2
                    WHEN 'evening' THEN 3
                    WHEN 'night' THEN 4
                END;

                SELECT 
                    "timeMinutes" / 60 as duration_hours,
                    CASE 
                        WHEN "timeMinutes" = 60 THEN '1 час'
                        WHEN "timeMinutes" = 180 THEN '3 часа'
                        WHEN "timeMinutes" = 300 THEN '5 часов'
                        WHEN "timeMinutes" = 420 THEN '7 часов'
                        ELSE "timeMinutes"::text || ' мин'
                    END as duration_label,
                    
                    AVG("timeMinutes") / 60.0 as avg_hours,
                    AVG("price") as avg_price
                FROM package_service
                WHERE "timeMinutes" > 0
                GROUP BY "timeMinutes"
                ORDER BY "timeMinutes";
            `, {
            type: 'SELECT'
        });

        return result;
    }

    // //	отобразить диаграмму: распределение аренды компьютеров по пакетам за выбранный период;
    // @Get('diagram/:period')
    // getDiagramData(@Param('period') period: number) {
    //     return this.dbService.getDiagramData(period);
    // }

    // //	вывести администраторов, проведших наибольшее количество сессий на текущий момент.
    // @Get('best-admins')
    // getBestAdmins() {
    //     return this.dbService.getBestAdninsByActivRental();
    //}
}