import { mapNftCollection } from './map-nft-collection'
import { mapUserDetails } from './map-user-details'
import { NftWithCollectionResponse } from '@echo/api'
import { Nft } from '@echo/firestore-types'
import { modifyUrlPropToString, removeUndefinedProps } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapNftWithCollection(nft: Nft): NftWithCollectionResponse {
  return pipe(
    removeUndefinedProps,
    modifyUrlPropToString('blurUrl'),
    modifyUrlPropToString('openSeaUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', mapNftCollection),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('owner', mapUserDetails),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl')
  )(nft) as NftWithCollectionResponse
}
