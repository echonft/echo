export const links = {
  collection: {
    all: '/collections/',
    items: (slug: string) => `/collection/${slug}/items`,
    listing: (slug: string, listingId: string) => `/collection/${slug}/listing/${listingId}`,
    listings: (slug: string) => `/collection/${slug}/listings`,
    nft: (slug: string, tokenId: number) => `/collection/${slug}/item/${tokenId}`,
    swaps: (slug: string) => `/collection/${slug}/swaps`
  },
  profile: {
    items: '/me/items',
    listingsCreated: '/me/listings/created',
    listingsReceived: '/me/listings/pending',
    offer: (id: string) => `/offer/${id}`,
    offersCreated: '/me/offers/created',
    offersReceived: '/me/offers/pending',
    swaps: '/me/swaps'
  },
  user: {
    items: (username: string) => `/user/${username}/items`,
    listings: (username: string) => `/user/${username}/listings`,
    swaps: (username: string) => `/user/${username}/swaps`
  }
}
