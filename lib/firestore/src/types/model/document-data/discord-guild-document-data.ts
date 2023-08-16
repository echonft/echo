import { NftCollectionDocumentData } from './nft-collection-document-data'
import { DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface DiscordGuildDocumentData extends DocumentData {
  channelId: string
  collections: DocumentReference<NftCollectionDocumentData>[]
  discordId: string
  name: string
}
