import { Body, Post, Controller, Get } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-admin.dto';
import { AdministratorsService } from './administrators.service';

@Controller('administrators')
export class AdministratorsController {

    constructor(private adminService: AdministratorsService){}

    @Post()
    create(@Body() adminDto: CreateAdministratorDto){
        return this.adminService.createAdministrator(adminDto);
    }

    @Get()
    getAll(){
        return this.adminService.getAllAdministrators();
    }
}
