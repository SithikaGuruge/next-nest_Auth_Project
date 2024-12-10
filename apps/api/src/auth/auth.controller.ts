import { Body,Post,Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth/jwt-auth.guard';

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


}
