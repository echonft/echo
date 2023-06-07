import { Attribute, NftResponse } from '../types/response/nft-response'
import { mapInt } from './map-int'
import { mapIntToString } from './map-int-to-string'
import { FirestoreNftAttribute, FirestoreNftPrototype } from '@echo/firestore'
import { applySpec, applyToProp, castAs } from '@echo/utils'
import { always, ifElse, isNil, map, pipe, prop } from 'ramda'

export const mapNft = applySpec<
  NftResponse,
  Omit<FirestoreNftPrototype, 'collectionId' | 'ownerId'> & { contractAddress: string }
>({
  balance: applyToProp('balance', mapInt),
  contractAddress: pipe(prop('contract'), prop('address')),
  description: prop('description'),
  name: prop('name'),
  pictureUrl: pipe(prop('image'), prop('pngUrl')),
  thumbnailUrl: pipe(prop('image'), prop('thumbnailUrl')),
  tokenId: pipe(applyToProp('tokenId', mapInt), castAs<number>),
  tokenType: pipe(prop('contract'), prop('tokenType')),
  attributes: pipe(
    prop('raw'),
    prop('metadata'),
    ifElse(
      isNil,
      always([]),
      pipe(
        prop('attributes'),
        ifElse(
          isNil,
          always([]),
          map(
            applySpec<Attribute, FirestoreNftAttribute>({
              value: pipe(prop('value'), mapIntToString),
              trait: prop('trait_type')
            })
          )
        )
      )
    )
  )
})
