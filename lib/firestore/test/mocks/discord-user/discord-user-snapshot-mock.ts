import type { DiscordUserDocumentData } from '@echo/firestore/types/model/discord-user/discord-user-document-data'
import { discordUserDocumentDataMock } from '@echo/firestore-mocks/discord-user/discord-user-document-data-mock'
import { discordUserReferenceMock } from '@echo/firestore-mocks/discord-user/discord-user-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const discordUserSnapshotMock: Record<string, QueryDocumentSnapshot<DiscordUserDocumentData>> = {
  WpgDZHmdpvHjykHRRWp7: {
    ref: discordUserReferenceMock.WpgDZHmdpvHjykHRRWp7!,
    id: discordUserReferenceMock.WpgDZHmdpvHjykHRRWp7!.id,
    exists: true,
    data: () => discordUserDocumentDataMock.WpgDZHmdpvHjykHRRWp7
  } as unknown as QueryDocumentSnapshot<DiscordUserDocumentData>,
  be5KGz2BfBRYbA1mCKQp: {
    ref: discordUserReferenceMock.be5KGz2BfBRYbA1mCKQp!,
    id: discordUserReferenceMock.be5KGz2BfBRYbA1mCKQp!.id,
    exists: true,
    data: () => discordUserDocumentDataMock.be5KGz2BfBRYbA1mCKQp
  } as unknown as QueryDocumentSnapshot<DiscordUserDocumentData>
}
