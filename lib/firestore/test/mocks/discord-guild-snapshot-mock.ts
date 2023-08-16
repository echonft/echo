import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { DiscordGuildDocumentData } from '../../src/types/model/document-data/discord-guild-document-data'
import { discordGuildDocumentDataMock } from './discord-guild-document-data-mock'
import { discordGuildReferenceMock } from './discord-guild-reference-mock'

export const discordGuildSnapshotMock: { [key: string]: FirestoreSnapshot<DiscordGuildDocumentData> } = {
  ncUnbpFfVCofV9bD7ctn: {
    ref: discordGuildReferenceMock['ncUnbpFfVCofV9bD7ctn']!,
    id: discordGuildReferenceMock['ncUnbpFfVCofV9bD7ctn']!.id,
    exists: true,
    data: () => discordGuildDocumentDataMock['ncUnbpFfVCofV9bD7ctn']
  } as unknown as FirestoreSnapshot<DiscordGuildDocumentData>,
  xA40abnyBq6qQHSYmtHj: {
    ref: discordGuildReferenceMock['xA40abnyBq6qQHSYmtHj']!,
    id: discordGuildReferenceMock['xA40abnyBq6qQHSYmtHj']!.id,
    exists: true,
    data: () => discordGuildDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']
  } as unknown as FirestoreSnapshot<DiscordGuildDocumentData>
}
