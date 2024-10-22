import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/helpers/are-nfts-in-escrow'
import { pipe } from 'ramda'

export async function areNftsInEscrow(_args: AreNftsInEscrowArgs): Promise<boolean> {
  return pipe(toPromise, delayPromise(800))(true)
}
