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
                AND r.status = 'active' OR r.status = 'waiting'
            ORDER BY v."fullName";
        `, {
            type: 'SELECT'
        });

        return visitors;
    }

    // //	отобразить список клиентов, арендующих компьютеры в вечернее время;
    // @Get('visitors-evening')
    // getVisitorsEveningTime() {
    //     return this.dbService.getVisitorsEveningTime();
    // }

    // //	получить среднее количество часов аренды и среднюю выручку для каждого пакета услуг (утреннего или вечернего) и для каждого периода аренды (1, 3, 5, 7 часов);
    // @Get('info-averege-nambers')
    // getAveregeNubers() {
    //     return this.dbService.getAveregeNubers();
    // }

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