import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/config/jwt-auth-guard';
import { Roles } from 'src/auth/config/roles.decorator';
import { RolesGuard } from 'src/auth/config/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  @Get('admin')
  @Roles('admin')
  getAdminData() {
    return 'Somente administradores podem ver isso!';
  }

  @Get('moderator')
  @Roles('moderator')
  getModeratorData() {
    return 'Somente moderadores podem ver isso!';
  }

  @Get('user')
  @Roles('user')
  getUserData() {
    return 'Somente usuarios podem ver isso!';
  }
}
