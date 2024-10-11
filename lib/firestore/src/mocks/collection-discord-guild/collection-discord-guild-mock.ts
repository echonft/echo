import type { CollectionDiscordGuildDocumentData } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild-document-data'
import { collectionMockPxId, collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'

export function collectionDiscordGuildMock(): Record<string, CollectionDiscordGuildDocumentData> {
  return {
    FTtQ8IaJAffIaSk66Fy6: {
      collectionId: collectionMockPxId(),
      guild: {
        id: '100',
        channelId: '100'
      }
    },
    '3gWDBihHVUQLJxbiJOIp': {
      collectionId: collectionMockSpiralId(),
      guild: {
        id: '1',
        channelId: '1'
      }
    }
  }
}
