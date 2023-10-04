import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { AlchemyNftAttribute } from '@echo/alchemy/types/model/alchemy-nft-attribute'
import type { AlchemyNftResponse } from '@echo/alchemy/types/response/alchemy-nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, applySpec, ifElse, invoker, map, path, pathEq, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

export function mapAlchemyNftResponseToAlchemyNft(nftResponse: AlchemyNftResponse): AlchemyNft {
  return applySpec<AlchemyNft>({
    balance: ifElse(pathEq('ERC1155', ['contract', 'tokenType']), pipe(prop('balance'), parseInt), always(1)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contractAddress: pipe(path(['contract', 'address']), getAddress),
    chainId: always(1),
    name: prop('name'),
    pictureUrl: path(['image', 'pngUrl']),
    thumbnailUrl: path(['image', 'thumbnailUrl']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tokenId: pipe(prop('tokenId'), parseInt),
    tokenType: path(['contract', 'tokenType']),
    attributes: pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
              applySpec<AlchemyNftAttribute>({
                value: pipe(prop('value'), invoker(0, 'toString')),
                trait: pipe(prop('trait_type'), invoker(0, 'toString'))
              })
            )
          )
        )
      )
    )
  })(nftResponse)
}
