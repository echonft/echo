import { Nft } from '../../types/nft'
import { mapNftCollection } from './map-nft-collection'
import { NftResponse } from '@echo/api'
import { modifyStringPropToUrl } from '@echo/utils'
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
