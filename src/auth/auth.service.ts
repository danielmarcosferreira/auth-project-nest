import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable() // Injectable diz pro nest the as classes subsequentes serao providers 
export class AuthService {
    constructor(private prismaService: PrismaService) { }
    async signup(data: SignUpDTO) {
        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (userAlreadyExists) {
            throw new UnauthorizedException()
        }

        const user = await this.prismaService.user.create({ data })

        return { 
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async signin(data: SignInDTO) {
        console.log(data);

        return 'signin';
    }
}
