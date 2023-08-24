import { GetNftResponse } from '../types/response/get-nft-response'
import { NftResponse } from '../types/response/nft-response'
import { applyToProp, isNilOrEmpty } from '@echo/utils'
import { always, applySpec, ifElse, map, path, pathEq, pipe, prop } from 'ramda'

export const mapNft: (nftResponse: NftResponse) => GetNftResponse = applySpec({
  balance: ifElse(pathEq('ERC1155', ['contract', 'tokenType']), applyToProp('balance', Number.parseInt), always(1)),
  contractAddress: path(['contract', 'address']),
  chainId: always(1),
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
