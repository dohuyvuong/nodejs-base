import { ErrorMessageEnum } from './error-message.enum';

export enum ResponseCodeEnum {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  RESOURCES_EXISTED = 'RESOURCES_EXISTED',
}

const CODE_MESSAGES: { [key in ResponseCodeEnum]: string } = {
  [ResponseCodeEnum.NOT_FOUND]: ErrorMessageEnum.NOT_FOUND,
  [ResponseCodeEnum.INTERNAL_SERVER_ERROR]: ErrorMessageEnum.INTERNAL_SERVER_ERROR,
  [ResponseCodeEnum.UNAUTHORIZED]: ErrorMessageEnum.UNAUTHORIZED,
  [ResponseCodeEnum.FORBIDDEN]: ErrorMessageEnum.FORBIDDEN,
  [ResponseCodeEnum.BAD_REQUEST]: ErrorMessageEnum.BAD_REQUEST,
  [ResponseCodeEnum.RESOURCES_EXISTED]: ErrorMessageEnum.RESOURCES_EXISTED,
};

export const getMessage = (code: ResponseCodeEnum): string => {
  return CODE_MESSAGES[code];
};
