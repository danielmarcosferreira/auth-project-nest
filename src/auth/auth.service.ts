import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable() // Injectable diz pro nest the as classes subsequentes serao providers 
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }
    async signup(data: SignUpDTO) {
        const userAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (userAlreadyExists) {
            throw new UnauthorizedException()
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.prismaService.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    async signin(data: SignInDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email
        })

        return { accessToken };
    }
}
