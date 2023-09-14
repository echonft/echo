import type { AlchemyCollection } from '@echo/alchemy/types/model/alchemy-collection'
import type { AlchemyContractResponse } from '@echo/alchemy/types/response/alchemy-contract-response'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { always, applySpec, path, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

export function mapAlchemyContractResponseToAlchemyCollection(
  contractResponse: AlchemyContractResponse
): AlchemyCollection {
  return applySpec<AlchemyCollection>({
    contract: applySpec({
      address: pipe(prop<string>('address'), getAddress),
      chainId: always(1),
      tokenType: prop('tokenType'),
      name: prop('name'),
      symbol: prop('symbol')
    }),
    description: path(['openSeaMetadata', 'description']),
    discordUrl: path(['openSeaMetadata', 'discordUrl']),
    floorPrice: path(['openSeaMetadata', 'floorPrice']),
    name: prop('name'),
    profilePictureUrl: path(['openSeaMetadata', 'imageUrl']),
    totalSupply: pipe(prop<string>('totalSupply'), unlessNil(parseInt)),
    twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
    websiteUrl: path(['openSeaMetadata', 'externalUrl'])
  })(contractResponse)
}
