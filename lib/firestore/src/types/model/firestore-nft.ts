import type { FirestoreNftAttribute } from '@echo/firestore/types/model/firestore-nft-attribute'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import type { FirestoreNftTokenType } from '@echo/firestore/types/model/firestore-nft-token-type'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'

export interface FirestoreNft {
  id: string
  attributes: FirestoreNftAttribute[]
  balance: number
  blurUrl?: URL
  collection: Partial<FirestoreNftCollection>
  name: string
  openSeaUrl?: URL
  owner: Partial<FirestoreUserDetails>
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: FirestoreNftTokenType
}
