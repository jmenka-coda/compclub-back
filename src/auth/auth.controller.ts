import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdministratorDto } from 'src/administrators/dto/create-admin.dto';
import { LoginAdministratorDto } from 'src/administrators/dto/login-admin.dto';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/login')
    @Public()
    login(@Body() adminLoginDto: LoginAdministratorDto){
        return this.authService.login(adminLoginDto);
    }

    @Post('/registration')
    @Public()
    registration(@Body() adminDto: CreateAdministratorDto){
        return this.authService.registration(adminDto);
    }

    @Get('check')
    check(@Request() req){
        return this.authService.generateToken(req.admin);
    }
}
