export const links = {
  collection: {
    items: (slug: string) => `/collection/${slug}/items`,
    listings: (slug: string) => `/collection/${slug}/listings`,
    nft: (slug: string, tokenId: number) => `/collection/${slug}/item/${tokenId}`,
    swaps: (slug: string) => `/collection/${slug}/swaps`
  },
  user: {
    items: (username: string) => `/user/${username}/items`,
    listings: (username: string) => `/user/${username}/listings`,
    swaps: (username: string) => `/user/${username}/swaps`
  }
}
