import { NftCollection } from '../../src/types/model/nft-collection'
import { nftCollectionMock } from './nft-collection-mock'

export const getAllCollectionMocks = (): NftCollection[] => Object.values(nftCollectionMock)
