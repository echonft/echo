import { NftWithCollection } from '../../types/nft-with-collection'
import { mapNftCollection } from './map-nft-collection'
import { mapUser } from './map-user'
import { NftWithCollectionResponse } from '@echo/api'
import { modifyStringPropToUrl } from '@echo/utils'
import { modify, pipe } from 'ramda'

export function mapNftWithCollection(response: NftWithCollectionResponse) {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('owner', mapUser),
    modify('collection', mapNftCollection),
    modifyStringPropToUrl('blurUrl'),
    modifyStringPropToUrl('openSeaUrl')
  )(response) as NftWithCollection
}
