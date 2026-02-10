import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdministratorDto } from 'src/administrators/dto/create-admin.dto';
import { LoginAdministratorDto } from 'src/administrators/dto/login-admin.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() adminLoginDto: LoginAdministratorDto){
        return this.authService.login(adminLoginDto);
    }

    @Post('/registration')
    registration(@Body() adminDto: CreateAdministratorDto){
        return this.authService.registration(adminDto);
    }


}
