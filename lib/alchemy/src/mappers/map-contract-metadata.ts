import { ContractResponse } from '../types/response/contract-response'
import { GetContractMetadataResponse } from '../types/response/get-contract-metadata-response'
import { mapInt } from './map-int'
import { applyToProp } from '@echo/utils'
import { always, applySpec, pipe, prop } from 'ramda'

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
  description: pipe(prop('openSeaMetadata'), prop('description')),
  discordUrl: pipe(prop('openSeaMetadata'), prop('discordUrl')),
  floorPrice: pipe(prop('openSeaMetadata'), prop('floorPrice')),
  name: prop('name'),
  profilePictureUrl: pipe(prop('openSeaMetadata'), prop('imageUrl')),
  totalSupply: applyToProp('totalSupply', mapInt),
  twitterUsername: pipe(prop('openSeaMetadata'), prop('twitterUsername')),
  websiteUrl: pipe(prop('openSeaMetadata'), prop('externalUrl'))
})
