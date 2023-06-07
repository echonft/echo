import { ContractResponse } from '../types/response/contract-response'
import { mapInt } from './map-int'
import { FirestoreContractPrototype, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { applySpec, applyToProp } from '@echo/utils'
import { always, pipe, prop } from 'ramda'

export const mapContractMetadata = applySpec<ContractResponse, Omit<FirestoreNftCollectionPrototype, 'discordGuild'>>({
  // FIXME No banner from alchemy?
  // bannerUrl: prop('openSeaMetadata.imageUrl'),
  contract: applySpec<ContractResponse, FirestoreContractPrototype>({
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
