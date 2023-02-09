import { FirestoreDiscordCollection } from '../../../firebase/src/types'
import { DocumentSnapshot } from '../../../firebase/src/types/firestore'
import { DiscordGuild } from '@echo/model'
import { isNil } from 'rambda'

/**
 * Map a firebase Collection snapshot to a Collection
 * @param snapshot The document snapshot
 * TODO Typing of the contracts
 */
export async function mapCollection(snapshot: DocumentSnapshot<FirestoreDiscordCollection>): Promise<DiscordGuild> {
  const data = snapshot.data()
  if (isNil(data)) {
    return Promise.reject(`No data for ${snapshot.ref.path}`)
  }
  return Promise.resolve({
    discordId: snapshot.id,
    channelId: data['channelId'],
    contractAddresses: data['allowedContracts'],
    name: data.name
  })
}
