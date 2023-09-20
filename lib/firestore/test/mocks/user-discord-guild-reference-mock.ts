import type { UserDiscordGuildDocumentData } from '@echo/firestore/types/model/user-discord-guild-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const userDiscordGuildReferenceMock: { [key: string]: DocumentReference<UserDiscordGuildDocumentData> } = {
  FTtQ8IaJAffIaSk66Fy6: {
    id: 'FTtQ8IaJAffIaSk66Fy6',
    path: 'userDiscordGuilds/FTtQ8IaJAffIaSk66Fy6'
  } as unknown as DocumentReference<UserDiscordGuildDocumentData>,
  '3gWDBihHVUQLJxbiJOIp': {
    id: '3gWDBihHVUQLJxbiJOIp',
    path: 'userDiscordGuilds/3gWDBihHVUQLJxbiJOIp'
  } as unknown as DocumentReference<UserDiscordGuildDocumentData>
}
