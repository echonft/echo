import { GetNftResponse } from '../types/response/get-nft-response'
import { NftResponse } from '../types/response/nft-response'
import { applyToProp, isNilOrEmpty, unlessNil } from '@echo/utils'
import { always, applySpec, ifElse, map, path, pipe, prop } from 'ramda'

export const mapNft: (nftResponse: NftResponse) => GetNftResponse = applySpec({
  balance: applyToProp('balance', unlessNil(Number.parseInt)),
  contractAddress: path(['contract', 'address']),
  description: prop('description'),
  name: prop('name'),
  pictureUrl: path(['image', 'pngUrl']),
  thumbnailUrl: path(['image', 'thumbnailUrl']),
  tokenId: applyToProp('tokenId', Number.parseInt),
  tokenType: path(['contract', 'tokenType']),
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
            applySpec({
              value: prop('value'),
              trait: prop('trait_type')
            })
          )
        )
      )
    )
  )
})
