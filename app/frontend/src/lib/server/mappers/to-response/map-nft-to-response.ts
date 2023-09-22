import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { modifyUrlPropToString } from '@echo/utils/fp/modify-url-prop-to-string'
import { mapCollectionToResponse } from '@server/mappers/to-response/map-collection-to-response'
import { modify, pipe } from 'ramda'

export function mapNftToResponse(nft: Partial<FirestoreNft>): NftResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyUrlPropToString<'blurUrl', Partial<FirestoreNft>>('blurUrl'),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', mapCollectionToResponse)
  )(nft)
}
