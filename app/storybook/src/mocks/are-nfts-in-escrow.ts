import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { AreNftsInEscrowArgs } from '@echo/web3-dom/helpers/are-nfts-in-escrow'

export async function areNftsInEscrow(_args: AreNftsInEscrowArgs): Promise<boolean> {
  return delayPromise(() => Promise.resolve(true), 800)()
}
