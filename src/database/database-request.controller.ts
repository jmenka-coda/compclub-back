import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseRequestService } from "./database-request.service";


@Controller('database-requests')
export class DatabaseRequestController {

    constructor(private dbService: DatabaseRequestService) { }

    @Get('visitors/:adminId')
    getVisitors(@Param('adminId') adminId: number) {
        return this.dbService.getActivVisitorByAdminId(adminId);
    }

}