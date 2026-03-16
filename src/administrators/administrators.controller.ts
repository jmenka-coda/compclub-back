import { Body, Post, Controller, Get, Param, Delete } from '@nestjs/common';
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

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.adminService.getAdminById(id);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: number){
        return this.adminService.deleteAdminById(id);
    }
}
