import { GetNftResponse } from '../types/response/get-nft-response'
import { Attribute, NftResponse } from '../types/response/nft-response'
import { mapInt } from './map-int'
import { FirestoreNftAttribute } from '@echo/firestore'
import { applySpec, applyToProp, castAs, isNilOrEmpty } from '@echo/utils'
import { always, ifElse, map, path, pipe, prop } from 'ramda'

export const mapNft = applySpec<NftResponse, GetNftResponse>({
  balance: applyToProp('balance', mapInt),
  contractAddress: pipe(prop('contract'), prop('address')),
  description: prop('description'),
  name: prop('name'),
  pictureUrl: pipe(prop('image'), prop('pngUrl')),
  thumbnailUrl: pipe(prop('image'), prop('thumbnailUrl')),
  tokenId: pipe(applyToProp('tokenId', mapInt), castAs<number>),
  tokenType: pipe(prop('contract'), prop('tokenType')),
  attributes: pipe(
    path(['raw', 'metadata']),
    ifElse(
      isNilOrEmpty,
      always({ attributes: [] }),
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prop('attributes'),
        ifElse(
          isNilOrEmpty,
          always([]),
          map(
            applySpec<Attribute, FirestoreNftAttribute>({
              value: prop('value'),
              trait: prop('trait_type')
            })
          )
        )
      )
    )
  )
  // attributes: always([])
})
