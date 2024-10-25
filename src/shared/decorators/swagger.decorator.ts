import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

export function ApiCreateResponseCustom(summary: string, description: string) {
  return applyDecorators(
    ApiOperation({
      summary,
      description
    }),
    ApiCreatedResponse({ description: 'Created' }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
}
