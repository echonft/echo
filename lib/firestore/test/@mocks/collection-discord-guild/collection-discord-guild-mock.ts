import { type CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { COLLECTION_MOCK_PX_ID, COLLECTION_MOCK_SPIRAL_ID } from '@echo/model-mocks/collection/collection-mock'

export const collectionDiscordGuildMock: Record<string, CollectionDiscordGuild> = {
  FTtQ8IaJAffIaSk66Fy6: {
    collectionId: COLLECTION_MOCK_PX_ID,
    guild: {
      id: '100',
      channelId: '100'
    }
  },
  '3gWDBihHVUQLJxbiJOIp': {
    collectionId: COLLECTION_MOCK_SPIRAL_ID,
    guild: {
      id: '1',
      channelId: '1'
    }
  }
}
