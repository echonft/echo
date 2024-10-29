import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function isCreateTargetNextButtonDisabled(
  creatorNfts: OwnedNft[],
  target: Nullable<Listing['target']>,
  step: number
) {
  if (step === 0) {
    return creatorNfts.length === 0 || isNil(target) || !target.quantity
  }
  return false
}
