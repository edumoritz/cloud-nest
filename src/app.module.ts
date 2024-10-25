import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
