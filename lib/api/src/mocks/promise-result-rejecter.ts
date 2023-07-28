import { R } from '@mobily/ts-belt'

export const promiseResultRejecter = <T>(): Promise<R.Result<T, Error>> => Promise.reject(new Error())
