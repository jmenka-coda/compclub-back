import { Injectable } from '@nestjs/common';
import { Administrator } from './administrators.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdministratorDto } from './dto/create-admin.dto';

@Injectable()
export class AdministratorsService {

    constructor(@InjectModel(Administrator) private adminRepository: typeof Administrator) { }
    
    async createAdministrator(dto: CreateAdministratorDto) {
        const admin = await this.adminRepository.create(dto);

        return admin;
    }

    async getAllAdministrators() {
        const admins = await this.adminRepository.findAll();
        return admins;
    }
}
