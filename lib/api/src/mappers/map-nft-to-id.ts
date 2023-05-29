import { FirestoreNftData } from '@echo/firestore'

export function mapNftToId(nft: FirestoreNftData): string {
  return nft.id
}
