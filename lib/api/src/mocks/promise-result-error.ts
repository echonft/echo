import { R } from '@mobily/ts-belt'

export const promiseResultError = <T>(): Promise<R.Result<T, Error>> =>
  Promise.resolve(R.fromNullable(undefined, new Error()))
