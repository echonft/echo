export const links = {
  collection: {
    collectionItemsLink: (slug: string) => `/collection/${slug}/items`,
    collectionListingsLink: (slug: string) => `/collection/${slug}/listings`,
    collectionSwapsLink: (slug: string) => `/collection/${slug}/swaps`
  },
  nft: {
    nftLink: (collectionSlug: string, tokenId: number) => `/collection/${collectionSlug}/item/${tokenId}`
  },
  userLink: (username: string) => `/user/${username}`
}
