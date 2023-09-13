import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { mapNftCollection } from '@echo/ui/mappers/from-api/map-nft-collection'
import type { Nft } from '@echo/ui/types/model/nft'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { modify, pipe } from 'ramda'

export function mapNft(response: Partial<NftResponse>) {
  return pipe(
    modifyStringPropToUrl<'blurUrl', Partial<NftResponse>>('blurUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('pictureUrl'),
    modifyStringPropToUrl('thumbnailUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', mapNftCollection)
  )(response) as Nft
}
