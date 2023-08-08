import { ContractResponse } from '../types/response/contract-response'
import { GetContractMetadataResponse } from '../types/response/get-contract-metadata-response'
import { mapInt } from './map-int'
import { applyToProp } from '@echo/utils'
import { always, applySpec, path, prop } from 'ramda'

export const mapContractMetadata: (contractResponse: ContractResponse) => GetContractMetadataResponse = applySpec({
  // FIXME No banner from alchemy?
  // bannerUrl: prop('openSeaMetadata.imageUrl'),
  contract: applySpec({
    address: prop<string>('address'),
    // TODO Should be flexible
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
  totalSupply: applyToProp('totalSupply', mapInt),
  twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
  websiteUrl: path(['openSeaMetadata', 'externalUrl'])
})
