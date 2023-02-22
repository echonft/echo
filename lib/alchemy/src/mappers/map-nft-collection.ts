import { AlchemyNftCollection, AlchemyNftContract } from '../types'
import { mapOpenSeaCollectionMetadata } from './map-open-sea-collection-metadata'
import { applySpec, applyToNullableProp, chainId } from '@echo/utils'
import { NftContract } from 'alchemy-sdk'
import { prop } from 'rambda'

export const mapNftCollection: (contract: NftContract) => AlchemyNftCollection = applySpec<
  NftContract,
  AlchemyNftCollection
>({
  contract: applySpec<NftContract, AlchemyNftContract>({
    address: prop('address'),
    chainId: chainId,
    name: prop('name'),
    symbol: prop('symbol'),
    tokenType: prop('tokenType')
  }),
  totalSupply: applyToNullableProp('totalSupply', Number),
  openSea: applyToNullableProp('openSea', mapOpenSeaCollectionMetadata)
})
