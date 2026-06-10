npm install @nestjs/jwt @nestjs/passport passport passport-jwt

AuthModule
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
-------
@Injectable()
export class AuthService {

  private users = [
    { username: 'admin', password: 'mc1', role: 'editor' },
    { username: 'user', password: 'us1', role: 'contributor' },
  ];

  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );

    if (!user) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        role: user.role
      }),
    };
  }
}
-----
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }
}
----
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
----
import { Controller, Get, Post, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('cards')
export class CardsController {

  private cards = [];
  private nextId = 1;

  @Get()
  getCards() {
    return this.cards;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCard(@Body() body: any, @Req() req: any) {

    if (req.user.role !== 'editor') {
      throw new ForbiddenException('Accesso negato');
    }

    const newCard = {
      id: this.nextId++,
      title: body.title,
      description: body.description,
      price: body.price
    };

    this.cards.push(newCard);
    return newCard;
  }
}
----
*** app module
import { Module } from '@nestjs/common';
import { CardsController } from './cards/cards.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CardsController],
})
export class AppModule {}
----
*** frontend js 
const baseUrl = "http://localhost:3000";
let token = "";

// LOGIN
function login() {
    fetch(baseUrl + "/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: "admin",
            password: "mc1"
        })
    })
    .then(res => res.json())
    .then(data => token = data.access_token);
}

// GET
function loadCards() {
    fetch(baseUrl + "/cards")
        .then(res => res.json())
        .then(data => console.log(data));
}

// POST
function createCard(card) {
    fetch(baseUrl + "/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(card)
    })
    .then(() => loadCards());
}