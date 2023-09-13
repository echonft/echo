import type { NftCollectionResponse } from '@echo/api/types/responses/model/nft-collection-response'
import type { NftCollection } from '@echo/ui/types/model/nft-collection'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
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
