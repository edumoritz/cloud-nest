import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninDTO, AuthSignupDTO, NewPasswordDTO } from './dto/auth-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiCreateResponseCustom } from 'src/shared/decorators/swagger.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreateResponseCustom('summary', 'description')
  async signUp(@Body() authSignupDTO: AuthSignupDTO) {
    return this.authService.signUp(authSignupDTO);
  }

  @Post('signin')
  @ApiCreateResponseCustom('summary', 'description')
  async signIn(@Body() body: AuthSigninDTO) {
    return this.authService.signIn(body.username, body.password);
  }

  @Put('update-password')
  @ApiCreateResponseCustom('summary', 'description')
  async updatePassword(@Body() newPasswordDTO: NewPasswordDTO) {
    return this.authService.updatePassword(newPasswordDTO);
  }
}
