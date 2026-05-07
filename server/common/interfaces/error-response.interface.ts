import { ErrorMessages } from '../constants/error-messages.ts';
import { APP_MESSAGES } from '../constants/app-messages';
import { NotFoundException } from '@nestjs/common';

export interface IErrorResponse {
  message: string;
  error_code: string;
}

const errorPayload: IErrorResponse = {
  message: APP_MESSAGES.USER.NOT_FOUND(id),
  error_code: ErrorMessages.USER_NOT_FOUND,
};

throw new NotFoundException(errorPayload);
