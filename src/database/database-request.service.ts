import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";


@Injectable()
export class DatabaseRequestService {

    constructor(@InjectConnection() private readonly sequelize: Sequelize){}

    async getActivVisitorByAdminId(adminId: number){
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
}