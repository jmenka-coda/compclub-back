import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Administrator } from './administrators.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdministratorDto } from './dto/create-admin.dto';

@Injectable()
export class AdministratorsService {

    constructor(@InjectModel(Administrator) private adminRepository: typeof Administrator) { }
    
    async createAdministrator(dto: CreateAdministratorDto) {
        const admin = await this.adminRepository.create(dto);

        const login = await this.getGeneratedLoginFromFullName(admin.get('fullName'), admin.get('id'));
        console.log(login);
        admin.set('login', login);
        admin.save();

        return admin;
    }

    async getAllAdministrators() {
        const admins = await this.adminRepository.findAll();
        return admins;
    }

    async getAdminByLogin(login: string){
        const admin = await this.adminRepository.findOne({where: {login}, raw: true});
        if (admin === null){
            throw new HttpException('Нет такого логина', HttpStatus.BAD_REQUEST)
        }

        return admin;
    }

    async getGeneratedLoginFromFullName(fullName: string, id: number){
        const array = fullName.split(' ');
        let login = "";
        for (let i = 0; i < array.length; i++) {
            login += array[i][0];
        }
        login += id;

        return login;
    }
}
