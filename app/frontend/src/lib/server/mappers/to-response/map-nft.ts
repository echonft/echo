import { mapUserDetails } from './map-user-details'
import { NftResponse } from '@echo/api'
import { Nft, NftCollection } from '@echo/firestore-types'
import { modifyUrlPropToString, removeUndefinedProps } from '@echo/utils'
import { assoc, dissoc, modify, pipe } from 'ramda'

export function mapNft(nft: Nft, collection: NftCollection): NftResponse {
  return pipe(
    removeUndefinedProps,
    modifyUrlPropToString('blurUrl'),
    modifyUrlPropToString('openSeaUrl'),
    dissoc('collection'),
    assoc('collectionId', collection.id),
    assoc('collectionName', collection.name),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('owner', mapUserDetails),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl')
  )(nft) as NftResponse
}
