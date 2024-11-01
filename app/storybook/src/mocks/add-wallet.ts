import { delayPromise } from '@echo/utils/helpers/delay-promise'

export async function addWallet(): Promise<void> {
  return delayPromise<void>(800)(Promise.resolve())
}
