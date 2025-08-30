export type Result<T, E = Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly _tag = 'Success' as const;
  constructor(readonly value: T) {}

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure<never> {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Success(fn(this.value));
  }

  flatMap<U, E>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }
}

export class Failure<E> {
  readonly _tag = 'Failure' as const;
  constructor(readonly error: E) {}

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure<E> {
    return true;
  }

  map<U>(_fn: (value: never) => U): Result<U, E> {
    return new Failure(this.error);
  }

  flatMap<U>(_fn: (value: never) => Result<U, E>): Result<U, E> {
    return new Failure(this.error);
  }
}

export const success = <T>(value: T): Success<T> => new Success(value);
export const failure = <E>(error: E): Failure<E> => new Failure(error);

// Add static methods to Result class
export class Result {
  static success<T>(value: T): Success<T> {
    return new Success(value);
  }

  static failure<E>(error: E): Failure<E> {
    return new Failure(error);
  }
}
