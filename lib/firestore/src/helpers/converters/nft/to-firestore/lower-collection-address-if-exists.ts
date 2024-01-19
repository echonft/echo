import { lowerCollectionAddress } from '@echo/firestore/helpers/converters/nft/lower-collection-address'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerCollectionAddressIfExists(nft: WithFieldValue<Nft>) {
  return whenHas<'collection', WithFieldValue<Nft>, Collection, WithFieldValue<Nft>>(
    'collection',
    lowerCollectionAddress
  )(nft)
}
