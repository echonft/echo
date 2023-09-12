import { Nft } from '../../types/nft'
import { mapNftCollection } from './map-nft-collection'
import type { NftResponse } from '@echo/api/types'
import modifyStringPropToUrl from '@echo/utils/modify-string-prop-to-url'
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
