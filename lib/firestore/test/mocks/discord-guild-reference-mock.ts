import { DiscordGuildDocumentData } from '../../src/types/model/document-data/discord-guild-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const discordGuildReferenceMock: { [key: string]: DocumentReference<DiscordGuildDocumentData> } = {
  ncUnbpFfVCofV9bD7ctn: {
    path: 'guilds/ncUnbpFfVCofV9bD7ctn',
    id: 'ncUnbpFfVCofV9bD7ctn'
  } as unknown as DocumentReference<DiscordGuildDocumentData>,
  xA40abnyBq6qQHSYmtHj: {
    path: 'guilds/xA40abnyBq6qQHSYmtHj',
    id: 'xA40abnyBq6qQHSYmtHj'
  } as unknown as DocumentReference<DiscordGuildDocumentData>
}
