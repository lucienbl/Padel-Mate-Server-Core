/**
 * https://github.com/typeorm/typeorm/issues/3608#issuecomment-476352843
 */

export class OptimisticLockVersionMismatchError extends Error {
  name = 'OptimisticLockVersionMismatchError';

  constructor(table: string, expectedVersion: number, actualVersion: number) {
    super();
    Reflect.setPrototypeOf(this, OptimisticLockVersionMismatchError.prototype);
    this.message = `The optimistic lock on table ${table} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}.`;
  }
}
