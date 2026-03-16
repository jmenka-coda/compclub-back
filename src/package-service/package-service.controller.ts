import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PackageServiceService } from './package-service.service';
import { CreatePackageServiceDto } from './dto/create-packageservice.dto';

@Controller('package-service')
export class PackageServiceController {

    constructor(private packageSerService: PackageServiceService){}

    @Post()
    create(@Body() packageSerDto: CreatePackageServiceDto){
        return this.packageSerService.createPackageServic(packageSerDto);
    }

    @Get()
    getAll(){
        return this.packageSerService.getAllPackageServic();
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.packageSerService.getPackageById(id);
    }

    @Get('/:id')
    deleteById(@Param('id') id: number) {
        return this.packageSerService.deletePackageById(id);
    }
}
