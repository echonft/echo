import { ContractResponse } from '../types/response/contract-response'
import { GetContractMetadataResponse } from '../types/response/get-contract-metadata-response'
import { NftTokenType } from '@echo/firestore'
import { unlessNil } from '@echo/utils'
import { getAddress } from 'ethers'
import { always, applySpec, path, pipe, prop } from 'ramda'

export const mapContractMetadata: (contractResponse: ContractResponse) => GetContractMetadataResponse = applySpec({
  contract: applySpec({
    address: pipe(prop<string>('address'), getAddress),
    chainId: always(1),
    tokenType: prop<NftTokenType>('tokenType'),
    name: prop('name'),
    symbol: prop('symbol')
  }),
  description: path(['openSeaMetadata', 'description']),
  discordUrl: path(['openSeaMetadata', 'discordUrl']),
  floorPrice: path(['openSeaMetadata', 'floorPrice']),
  name: prop('name'),
  profilePictureUrl: path(['openSeaMetadata', 'imageUrl']),
  totalSupply: pipe(prop<string>('totalSupply'), unlessNil(Number.parseInt)),
  twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
  websiteUrl: path(['openSeaMetadata', 'externalUrl'])
})
