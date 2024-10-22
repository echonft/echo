import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import { pipe } from 'ramda'

export function contractCreateOffer(_args: ContractCreateOfferArgs): Promise<HexString> {
  return pipe(toPromise, delayPromise(800))('0xOfferCreated')
}
