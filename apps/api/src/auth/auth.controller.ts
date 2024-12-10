import { Body,Post,Controller, UseGuards, Request, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth/jwt-auth.guard';
import { GoogleAuthGuard } from './guard/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  registerUser(
    @Body() CreateUserDto:CreateUserDto){
      return this.authService.registerUser(CreateUserDto);

    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    login(@Request() req){
      return this.authService.login(req.user.id,req.user.name);

    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getAll(@Request() req){
      return {message:`Now you can acess this route. This is your ID:${req.user.id}`};
    }

    @UseGuards(JwtAuthGuard)
    @Post("refresh")
    refreshToken(@Request() req){
      return this.authService.refreshToken(req.user.id,req.user.name);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {}

    @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('Google User', req.user);
    const resopnse = await this.authService.login(
      req.user.id,
      req.user.name,
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${resopnse.id}&name=${resopnse.name}&accessToken=${resopnse.accessToken}&refreshToken=${resopnse.refreshToken}`,
    );
  }y

}
