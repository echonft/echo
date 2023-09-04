import { AlchemyNft } from '../types/model/alchemy-nft'
import { NftResponse } from '../types/response/nft-response'
import { applyToProp, isNilOrEmpty } from '@echo/utils'
import { always, applySpec, ifElse, map, path, pathEq, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

export function mapNft(nftResponse: NftResponse): AlchemyNft {
  return applySpec<AlchemyNft>({
    balance: ifElse(pathEq('ERC1155', ['contract', 'tokenType']), applyToProp('balance', parseInt), always(1)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contractAddress: pipe(path(['contract', 'address']), getAddress),
    chainId: always(1),
    name: prop('name'),
    pictureUrl: path(['image', 'pngUrl']),
    thumbnailUrl: path(['image', 'thumbnailUrl']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tokenId: applyToProp('tokenId', parseInt),
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
  })(nftResponse)
}
