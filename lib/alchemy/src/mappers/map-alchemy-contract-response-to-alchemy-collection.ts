import { mapAlchemyContractResponseToAlchemyContract } from '@echo/alchemy/mappers/map-alchemy-contract-response-to-alchemy-contract'
import { type AlchemyCollection } from '@echo/alchemy/types/model/alchemy-collection'
import { type ContractResponse } from '@echo/alchemy/types/response/contract-response'
import { applySpec, isNil, partialRight, path, pipe, prop, unless } from 'ramda'

export function mapAlchemyContractResponseToAlchemyCollection(chainId: number) {
  return function (contractResponse: ContractResponse): AlchemyCollection {
    return applySpec<AlchemyCollection>({
      contract: mapAlchemyContractResponseToAlchemyContract(chainId),
      description: path(['openSeaMetadata', 'description']),
      discordUrl: path(['openSeaMetadata', 'discordUrl']),
      floorPrice: path(['openSeaMetadata', 'floorPrice']),
      name: prop('name'),
      profilePictureUrl: path(['openSeaMetadata', 'imageUrl']),
      totalSupply: pipe(prop('totalSupply'), unless(isNil, partialRight(parseInt, [10]))),
      twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
      websiteUrl: path(['openSeaMetadata', 'externalUrl'])
    })(contractResponse)
  }
}
