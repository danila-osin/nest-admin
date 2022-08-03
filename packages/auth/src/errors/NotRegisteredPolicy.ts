export class NotRegisteredPolicyError extends Error {
  constructor(controllerName: string) {
    super(`Policy is not registered for "${controllerName}"`);
  }
}
