import { WalletStatus } from '@echo/model/constants/wallet-status'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { pipe } from 'ramda'

export async function getWalletStatus(): Promise<
  | {
      status: WalletStatus.NeedsSignature
      nonce: string
    }
  | {
      status: Exclude<WalletStatus, WalletStatus.NeedsSignature>
    }
> {
  return pipe(toPromise, delayPromise(800))({ status: WalletStatus.Linked })
}
