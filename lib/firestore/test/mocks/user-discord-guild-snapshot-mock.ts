import type { UserDiscordGuildDocumentData } from '@echo/firestore/types/model/user-discord-guild-document-data'
import { userDiscordGuildDocumentDataMock } from '@echo/firestore-mocks/user-discord-guild-document-data-mock'
import { userDiscordGuildReferenceMock } from '@echo/firestore-mocks/user-discord-guild-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const userDiscordGuildSnapshotMock: { [key: string]: QueryDocumentSnapshot<UserDiscordGuildDocumentData> } = {
  FTtQ8IaJAffIaSk66Fy6: {
    ref: userDiscordGuildReferenceMock['FTtQ8IaJAffIaSk66Fy6']!,
    id: userDiscordGuildReferenceMock['FTtQ8IaJAffIaSk66Fy6']!.id,
    exists: true,
    data: () => userDiscordGuildDocumentDataMock['FTtQ8IaJAffIaSk66Fy6']
  } as unknown as QueryDocumentSnapshot<UserDiscordGuildDocumentData>,
  '3gWDBihHVUQLJxbiJOIp': {
    ref: userDiscordGuildReferenceMock['3gWDBihHVUQLJxbiJOIp']!,
    id: userDiscordGuildReferenceMock['3gWDBihHVUQLJxbiJOIp']!.id,
    exists: true,
    data: () => userDiscordGuildDocumentDataMock['3gWDBihHVUQLJxbiJOIp']
  } as unknown as QueryDocumentSnapshot<UserDiscordGuildDocumentData>
}
