import { mapAlchemyContractResponseToAlchemyContract } from '@echo/alchemy/mappers/map-alchemy-contract-response-to-alchemy-contract'
import { type AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { type AlchemyNftAttribute } from '@echo/alchemy/types/model/alchemy-nft-attribute'
import { type AlchemyNftResponse } from '@echo/alchemy/types/response/alchemy-nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import {
  always,
  applySpec,
  ifElse,
  invoker,
  isNotNil,
  map,
  modify,
  path,
  pathEq,
  pathSatisfies,
  pipe,
  prop
} from 'ramda'
import { getAddress } from 'viem'

export function mapAlchemyNftResponseToAlchemyNft(chainId: number) {
  return function (nftResponse: AlchemyNftResponse): AlchemyNft {
    return pipe(
      modify('contract', mapAlchemyContractResponseToAlchemyContract(chainId)),
      applySpec<AlchemyNft>({
        balance: ifElse(pathEq('ERC1155', ['contract', 'tokenType']), pipe(prop('balance'), parseInt), always(1)),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        contractAddress: pipe(path(['contract', 'address']), getAddress),
        chainId: path(['contract', 'chainId']),
        name: prop('name'),
        // Not all links are always provided so add either cached or original if pngUrl does not exist
        pictureUrl: ifElse(
          pathSatisfies(isNotNil, ['image', 'pngUrl']),
          path(['image', 'pngUrl']),
          ifElse(
            pathSatisfies(isNotNil, ['image', 'cachedUrl']),
            path(['image', 'cachedUrl']),
            path(['image', 'originalUrl'])
          )
        ),
        // Not all links are always provided so add original if thumbnailUrl does not exist
        thumbnailUrl: ifElse(
          pathSatisfies(isNotNil, ['image', 'thumbnailUrl']),
          path(['image', 'thumbnailUrl']),
          path(['image', 'originalUrl'])
        ),
        tokenId: pipe(prop('tokenId'), parseInt),
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
                  applySpec<AlchemyNftAttribute>({
                    value: pipe(prop('value'), invoker(0, 'toString')),
                    trait: pipe(prop('trait_type'), invoker(0, 'toString'))
                  })
                )
              )
            )
          )
        )
      })
    )(nftResponse)
  }
}
