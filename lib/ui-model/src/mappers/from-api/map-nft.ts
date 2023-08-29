import { Nft } from '../../types/nft'
import { mapUser } from './map-user'
import { NftResponse } from '@echo/api-public'
import { modifyStringPropToUrl } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapNft(response: NftResponse) {
  return pipe(
    modifyStringPropToUrl('blurUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('owner', mapUser),
    modifyStringPropToUrl('pictureUrl'),
    modifyStringPropToUrl('thumbnailUrl')
  )(response) as Nft
}
