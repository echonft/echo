import { mapOpenSeaCollectionMetadata } from './map-open-sea-collection-metadata'
import { Contract, NftCollection } from '@echo/model'
import { applySpec, applyToNullableProp, chainId } from '@echo/utils'
import { NftContract } from 'alchemy-sdk'
import { prop } from 'rambda'

export const mapNftCollection: (contract: NftContract) => NftCollection = applySpec<NftContract, NftCollection>({
  contract: applySpec<NftContract, Contract>({
    address: prop('address'),
    chainId: chainId
  }),
  tokenType: prop('tokenType'),
  name: prop('name'),
  symbol: prop('symbol'),
  totalSupply: applyToNullableProp('totalSupply', Number),
  openSea: applyToNullableProp('openSea', mapOpenSeaCollectionMetadata)
})
