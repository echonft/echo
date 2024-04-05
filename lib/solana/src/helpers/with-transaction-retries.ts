import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { SendTransactionError } from '@solana/web3.js'
import { inc, is } from 'ramda'

async function execute<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  args: TArgs,
  retries: number
): Promise<TResult> {
  try {
    return await fn.call(fn, ...args)
  } catch (e) {
    if (!is(SendTransactionError, e) || retries === 10) {
      throw e
    }
    const retry = inc(retries)
    return await delayPromise(execute)(fn, args, retry)
  }
}
export function withTransactionRetries<TArgs extends unknown[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
  return async function (...args: TArgs) {
    return await execute(fn, args, 0)
  }
}
