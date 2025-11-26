import { Body, Controller, Post } from '@nestjs/common';
import type { SignInDTO, SignUpDTO } from './dtos/auth';

@Controller('auth')
export class AuthController {
    // POST /auth/signup
    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        console.log({ body });
    }

    // POST /auth/signin
    @Post('signin')
    async signin(@Body() body: SignInDTO) {
        console.log({ body })
    }
}
