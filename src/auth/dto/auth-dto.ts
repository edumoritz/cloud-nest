import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthSigninDTO {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthSignupDTO extends AuthSigninDTO {
  @ApiProperty()
  @IsString()
  email: string;
}

export class NewPasswordDTO {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  newPassword: string;
  @ApiProperty()
  @IsString()
  session: string;
}
