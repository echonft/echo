import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { mapCollectionFromResponse } from '@echo/ui/mappers/from-api/map-collection-from-response'
import type { Nft } from '@echo/ui/types/model/nft'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { modify, pipe } from 'ramda'

export function mapNftFromResponse(response: NftResponse) {
  return pipe(
    modifyStringPropToUrl<'blurUrl', NftResponse>('blurUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('pictureUrl'),
    modifyStringPropToUrl('thumbnailUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', mapCollectionFromResponse)
  )(response) as Nft
}
