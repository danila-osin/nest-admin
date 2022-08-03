import { Type } from '@nestjs/common';
import { REQUIRED_POLICY_METHODS } from '../constants';
import { IPolicy } from '../interfaces';
import { getProtoFunctionNames } from '../utils';

export const isPolicy = (Policy: Type): Policy is Type<IPolicy> => {
  return REQUIRED_POLICY_METHODS.every((method) => getProtoFunctionNames(Policy).includes(method));
};
