import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credential.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post('login')
    async login(@Body() credentials: CredentialsDto) {
        return this.authService.login(credentials);
    }
    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        return this.authService.refreshToken(body.refresh_token);
    }   
}
