import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { discordUserDocumentDataMock } from '@echo/firestore-mocks/discord-user/discord-user-document-data-mock'

export async function initializeDiscordUsers() {
  const discordUsers = Object.values(discordUserDocumentDataMock)
  for (const discordUser of discordUsers) {
    await firestoreApp().collection(CollectionName.DISCORD_USERS).doc(discordUser.id).set(discordUser)
  }
}
