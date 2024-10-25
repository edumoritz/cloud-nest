// import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import {
  AuthFlowType,
  ChallengeNameType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { AuthSignupDTO, NewPasswordDTO } from './dto/auth-dto';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  async signUp(authSignupDTO: AuthSignupDTO) {
    const { username, email, password } = authSignupDTO;

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        }
      ]
    });
    return await this.cognitoClient.send(command);
  }

  async signIn(username: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    });

    const response = await this.cognitoClient.send(command);
    if (response.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
      return {
        challengeName: response.ChallengeName,
        session: response.Session,
        challengeParameters: response.ChallengeParameters
      };
    }

    return {
      access_token: response.AuthenticationResult.AccessToken,
      id_token: response.AuthenticationResult.IdToken,
      refresh_token: response.AuthenticationResult.RefreshToken,
      expires_in: response.AuthenticationResult.ExpiresIn
    };
  }

  async updatePassword(newPasswordDTO: NewPasswordDTO) {
    const { username, newPassword, session } = newPasswordDTO;
    const command = new RespondToAuthChallengeCommand({
      ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
      ClientId: process.env.COGNITO_CLIENT_ID,
      ChallengeResponses: {
        USERNAME: username,
        NEW_PASSWORD: newPassword
      },
      Session: session
    });

    const response = await this.cognitoClient.send(command);

    return {
      access_token: response.AuthenticationResult.AccessToken,
      id_token: response.AuthenticationResult.IdToken,
      refresh_token: response.AuthenticationResult.RefreshToken,
      expires_in: response.AuthenticationResult.ExpiresIn
    };
  }
}
