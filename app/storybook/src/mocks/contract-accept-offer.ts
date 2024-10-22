import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { pipe } from 'ramda'

export function contractAcceptOffer(_args: ContractUpdateOfferArgs): Promise<HexString> {
  return pipe(toPromise, delayPromise(800))('0xOfferAccepted')
}
