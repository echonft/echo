import { Nft } from '../../types/nft'

export const nftEquals = (source: Nft) => (target: Nft) => source.id === target.id
