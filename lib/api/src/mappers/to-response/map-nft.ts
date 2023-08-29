import { mapNftCollection } from './map-nft-collection'
import { mapUserDetails } from './map-user-details'
import { NftResponse } from '@echo/api-public'
import { Nft, NftCollection } from '@echo/firestore'
import { modifyUrlPropToString, removeUndefinedProps } from '@echo/utils'
import { assoc, isNil, modify, pick, pipe } from 'ramda'

export function mapNft(nft: Nft, collection?: NftCollection): NftResponse {
  return pipe(
    removeUndefinedProps,
    modifyUrlPropToString('blurUrl'),
    modifyUrlPropToString('openSeaUrl'),
    isNil(collection) ? modify('collection', mapNftCollection) : assoc('collection', pick(['id'], collection)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('owner', mapUserDetails),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl')
  )(nft) as NftResponse
}
