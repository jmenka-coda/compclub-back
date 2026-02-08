import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PackageService } from './package-service.model';
import { CreatePackageServiceDto } from './dto/create-packageservice.dto';

@Injectable()
export class PackageServiceService {

    constructor(@InjectModel(PackageService) private packageSerRepository: typeof PackageService) { }

    async createPackageServic(dto: CreatePackageServiceDto) {
        const packageServic = await this.packageSerRepository.create(dto);
        return packageServic;
    }


    async getAllPackageServic() {
        const packages = await this.packageSerRepository.findAll();
        return packages;
    }

    async getPackageById(id: number) {
        const packageSer = await this.packageSerRepository.findOne({ where: { id } })
        return packageSer;
    }
}
