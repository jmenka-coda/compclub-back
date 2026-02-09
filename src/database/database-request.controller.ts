import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseRequestService } from "./database-request.service";


@Controller('database-requests')
export class DatabaseRequestController {

    constructor(private dbService: DatabaseRequestService) { }

    //	вывести по заданному администратору список его текущих клиентов;
    @Get('visitors/:adminId')
    getVisitors(@Param('adminId') adminId: number) {
        return this.dbService.getActivVisitorByAdminId(adminId);
    }

    //	отобразить клиентов, арендующих компьютеры на 3 и более часа;
    @Get('visitors-three-h')
    getVisitorsMoreThreeHours() {
        return this.dbService.getVisitorsMoreThreeHours();
    }

    //	отобразить список клиентов, арендующих компьютеры в вечернее время;
    @Get('visitors-evening')
    getVisitorsEveningTime() {
        return this.dbService.getVisitorsEveningTime();
    }

    //	получить среднее количество часов аренды и среднюю выручку для каждого пакета услуг (утреннего или вечернего) и для каждого периода аренды (1, 3, 5, 7 часов);
    @Get('info-averege-numbers')
    getAveregeNubers() {
        return this.dbService.getAverageNumbers();
    }

    // //	отобразить диаграмму: распределение аренды компьютеров по пакетам за выбранный период;
    // @Get('diagram/:period')
    // getDiagramData(@Param('period') period: number) {
    //     return this.dbService.getDiagramData(period);
    // }

    // //	вывести администраторов, проведших наибольшее количество сессий на текущий момент.
    // @Get('best-admins')
    // getBestAdmins(){
    //     return this.dbService.getBestAdninsByActivRental();
    // }

    //	сформировать документы: чек о запланированной аренде, указывающий дату, пакет услуг и стоимость (Word); отчет об использовании компьютеров, включая дату, длительность и общую стоимость (Excel);


}