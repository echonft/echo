import type { NftItem } from '@echo/helius/types/response/get-nfts-for-owner-response'
import type { Contract } from '@echo/model/types/contract'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

// FIXME This needs fixing as it doesnt map exactly as expected
export function mapNftItem(item: NftItem, owner: User): Nft {
  return {
    collection: {
      name: 'Solana',
      slug: 'solana',
      totalSupply: 1,
      id: 'SOLANA',
      contract: {} as Contract,
      description: 'Soalana Test',
      profilePictureUrl: '',
      verified: true
    },
    id: item.id,
    owner,
    attributes:
      item.content.metadata.attributes?.map((attr) => ({
        value: attr.value ?? 'value',
        trait: attr.trait_type ?? 'trait'
      })) ?? [],
    balance: 1,
    name: item.content.metadata.name,
    pictureUrl: item.content.links.image,
    tokenId: 1,
    tokenType: 'ERC721',
    updatedAt: 1
  }
}
