import { isDev } from '@echo/utils/constants/is-dev'

const baseUrl = isDev ? 'http://localhost:3000/api' : `https://${process.env.VERCEL_URL}/api`
export const apiUrl = {
  collection: {
    all: `${baseUrl}/collections`,
    get: (slug: string) => `${baseUrl}/collection/${slug}`,
    listings: (slug: string) => `${baseUrl}/collection/${slug}/listings`,
    nft: (slug: string, tokenId: string) => `${baseUrl}/collection/${slug}/item/${tokenId}`,
    nfts: (slug: string) => `${baseUrl}/collection/${slug}/items`,
    swaps: (slug: string) => `${baseUrl}/collection/${slug}/swaps`
  },
  listing: {
    all: `${baseUrl}/listings`,
    cancel: (id: string) => `${baseUrl}/listing/${id}/cancel`,
    create: `${baseUrl}/listing`,
    get: (id: string) => `${baseUrl}/listing/${id}`
  },
  nft: {},
  offer: {
    accept: (id: string) => `${baseUrl}/offer/${id}/accept`,
    cancel: (id: string) => `${baseUrl}/offer/${id}/cancel`,
    create: `${baseUrl}/offer`,
    get: (id: string) => `${baseUrl}/offer/${id}`,
    reject: (id: string) => `${baseUrl}/offer/${id}/reject`,
    signature: (id: string) => `${baseUrl}/offer/${id}/signature`
  },
  profile: {
    nonce: `${baseUrl}/profile/nonce`,
    offers: `${baseUrl}/profile/offers`,
    wallet: `${baseUrl}/profile/wallet`
  },
  swap: {
    all: `${baseUrl}/swaps`
  },
  user: {
    get: (username: string) => `${baseUrl}/user/${username}`,
    listings: (username: string) => `${baseUrl}/user/${username}/listings`,
    nfts: (username: string) => `${baseUrl}/user/${username}/items`,
    swaps: (username: string) => `${baseUrl}/user/${username}/swaps`
  }
}
