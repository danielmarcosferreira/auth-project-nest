import { Injectable } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';

@Injectable() // Injectable diz pro nest the as classes subsequentes serao providers 
export class AuthService {
    async signup(data: SignUpDTO) {
        console.log(data);
        
        return 'signup';
    }

    async signin(data: SignInDTO) {
        console.log(data);
        
        return 'signin';
    }
}
