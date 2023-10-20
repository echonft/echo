import { type NftAttribute } from '@echo/model/types/nft-attribute'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export function nftAttributeEquals(attributeA: NftAttribute, attributeB: NftAttribute) {
  try {
    const traitDiff = attributeA.trait.localeCompare(attributeB.trait)
    if (traitDiff === 0) {
      return attributeA.value.localeCompare(attributeB.value)
    }
    return traitDiff
  } catch (e) {
    logger.error(
      `error comparing NFT attributes. 1st attribute ${JSON.stringify(attributeA)} 2nd attribute ${JSON.stringify(
        attributeB
      )}\n${errorMessage(e)}`
    )
    return -1
  }
}
