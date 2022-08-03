import { REQUIRED_POLICY_METHODS } from '../constants';

export class SpecifiedClassIsNotPolicyError extends Error {
  constructor(className: string) {
    super(
      `Specified class "${className}" is not a Policy class. Required methods: ${REQUIRED_POLICY_METHODS.join(
        ', '
      )}`
    );
  }
}
