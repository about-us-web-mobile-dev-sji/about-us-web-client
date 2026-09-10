/** Orders session mutations and keeps the queue usable after a failed operation. */
export class AuthOperationQueue {
  private pending: Promise<unknown> = Promise.resolve();

  enqueue<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.pending.then(operation);
    this.pending = result.catch(() => undefined);
    return result;
  }
}
