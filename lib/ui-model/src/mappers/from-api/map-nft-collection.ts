import { NftCollection } from '../../types/nft-collection'
import { NftCollectionResponse } from '@echo/api-public'
import { assocUndefinedIfPropNotPresent, modifyStringPropToUrl } from '@echo/utils'
import { pipe } from 'ramda'

export function mapNftCollection(response: NftCollectionResponse): NftCollection {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyStringPropToUrl('bannerUrl'),
    modifyStringPropToUrl('blurUrl'),
    modifyStringPropToUrl('discordUrl'),
    assocUndefinedIfPropNotPresent('floorPrice'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('profilePictureUrl'),
    assocUndefinedIfPropNotPresent('totalSupply'),
    assocUndefinedIfPropNotPresent('twitterUsername'),
    modifyStringPropToUrl('websiteUrl')
  )(response)
}
