import unlessNil from '@echo/utils/unless-nil'
import type { AlchemyNftCollection } from '@echo-alchemy/types/model/alchemy-nft-collection'
import type { ContractResponse } from '@echo-alchemy/types/response/contract-response'
import { always, applySpec, path, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

export function mapNftCollection(contractResponse: ContractResponse): AlchemyNftCollection {
  return applySpec<AlchemyNftCollection>({
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
