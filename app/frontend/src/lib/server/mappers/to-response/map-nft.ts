import { mapNftCollection } from './map-nft-collection'
import { NftResponse } from '@echo/api'
import { Nft } from '@echo/firestore-types'
import { modifyUrlPropToString } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapNft(nft: Partial<Nft>): NftResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    modifyUrlPropToString<'blurUrl', Partial<Nft>>('blurUrl'),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('collection', mapNftCollection)
  )(nft)
}
