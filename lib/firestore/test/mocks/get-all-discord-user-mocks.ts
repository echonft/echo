import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { discordUserMock } from '@echo/firestore-mocks/discord-user-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllDiscordUserMocks = () => Object.values(discordUserMock) as NonEmptyArray<FirestoreDiscordUser>
