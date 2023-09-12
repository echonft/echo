import { NftAttribute } from '../types/nft-attribute'
import errorMessage from '@echo/utils/error-message'
import logger from '@echo/utils/logger'

export function compareNftAttributes(attributeA: NftAttribute, attributeB: NftAttribute) {
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
