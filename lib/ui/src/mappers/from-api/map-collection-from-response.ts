import type { CollectionResponse } from '@echo/api/types/responses/model/collection-response'
import type { Collection } from '@echo/ui/types/model/collection'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { pipe } from 'ramda'

export function mapCollectionFromResponse(response: Partial<CollectionResponse>): Collection {
  return pipe(
    modifyStringPropToUrl<'bannerUrl', Partial<CollectionResponse>>('bannerUrl'),
    modifyStringPropToUrl('blurUrl'),
    modifyStringPropToUrl('discordUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('profilePictureUrl'),
    modifyStringPropToUrl('websiteUrl')
  )(response) as Collection
}
