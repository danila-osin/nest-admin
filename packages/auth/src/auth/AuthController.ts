import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';
import { ILoginDto, ILoginResponse, IRegisterDto, IRegisterResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: ILoginDto): Observable<ILoginResponse> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: IRegisterDto): Observable<IRegisterResponse> {
    return this.authService.register(dto);
  }
}
