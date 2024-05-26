import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'

export function contractAcceptOffer(_args: ContractUpdateOfferArgs): Promise<HexString> {
  return delayPromise(() => Promise.resolve<HexString>('0xOfferAccepted'), 800)()
}
