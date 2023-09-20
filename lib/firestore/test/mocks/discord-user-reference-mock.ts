import type { DiscordUserDocumentData } from '@echo/firestore/types/model/discord-user-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const discordUserReferenceMock: { [key: string]: DocumentReference<DiscordUserDocumentData> } = {
  WpgDZHmdpvHjykHRRWp7: {
    id: 'WpgDZHmdpvHjykHRRWp7',
    path: 'discordUsers/WpgDZHmdpvHjykHRRWp7'
  } as unknown as DocumentReference<DiscordUserDocumentData>,
  be5KGz2BfBRYbA1mCKQp: {
    id: 'be5KGz2BfBRYbA1mCKQp',
    path: 'discordUsers/be5KGz2BfBRYbA1mCKQp'
  } as unknown as DocumentReference<DiscordUserDocumentData>
}
