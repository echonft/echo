import { getNftCollectionUrl } from './get-nft-collection-url'

export const getNftCollectionListingsUrl = (id: string) => `${getNftCollectionUrl(id)}/listings`
