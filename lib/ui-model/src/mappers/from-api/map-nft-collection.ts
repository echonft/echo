import { NftCollection } from '../../types/nft-collection'
import { NftCollectionResponse } from '@echo/api'
import { modifyStringPropToUrl } from '@echo/utils'
import { pipe } from 'ramda'

export function mapNftCollection(response: Partial<NftCollectionResponse>): NftCollection {
  return pipe(
    modifyStringPropToUrl<'bannerUrl', Partial<NftCollectionResponse>>('bannerUrl'),
    modifyStringPropToUrl('blurUrl'),
    modifyStringPropToUrl('discordUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('profilePictureUrl'),
    modifyStringPropToUrl('websiteUrl')
  )(response) as NftCollection
}
