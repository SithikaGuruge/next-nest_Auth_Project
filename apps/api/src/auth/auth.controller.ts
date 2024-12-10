import { Body,Post,Controller, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';

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
      return req.user;

    }
}
