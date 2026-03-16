import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { Administrator } from 'src/administrators/administrators.model';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { CreateAdministratorDto } from 'src/administrators/dto/create-admin.dto';
import { LoginAdministratorDto } from 'src/administrators/dto/login-admin.dto';

@Injectable()
export class AuthService {

    constructor(private adminService: AdministratorsService,
        private jwtService: JwtService
    ) { }

    async login(adminLoginDto: LoginAdministratorDto) {
        const admin = await this.validateAdmin(adminLoginDto);
        return this.generateToken(admin);
    }

    async registration(adminDto: CreateAdministratorDto) {
        const hashPassword = await bcrypt.hash(adminDto.password, 5);
        const admin = await this.adminService.createAdministrator({ ...adminDto, password: hashPassword })
        return this.generateToken(admin);
    }

    async generateToken(admin: Administrator) {
        console.log(admin.id)
        const adminBd = await this.adminService.getAdminById(admin.id)
        const payload = { login: adminBd.login, id: admin.id }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateAdmin(adminLoginDto: LoginAdministratorDto) {
        const admin = await this.adminService.getAdminByLogin(adminLoginDto.login);

        const passwordEquals = await bcrypt.compare(adminLoginDto.password, admin.password);
        if (admin && passwordEquals) {
            return admin;
        }
        throw new UnauthorizedException({ message: 'Некоректный логин или пароль' });
    }
}
