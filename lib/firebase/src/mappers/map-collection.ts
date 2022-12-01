import { FirebaseCollection } from '../types'
import { Collection } from '@echo/model'
import { DocumentSnapshot } from 'firebase/firestore'
import { isNil } from 'rambda'

/**
 * Map a firebase Collection snapshot to a Collection
 * @param snapshot The document snapshot
 * TODO Typing of the contracts
 */
export async function mapCollection(snapshot: DocumentSnapshot<FirebaseCollection>): Promise<Collection> {
  const data = snapshot.data()
  if (isNil(data)) {
    return Promise.reject(`No data for ${snapshot.ref.path}`)
  }
  return Promise.resolve({
    discordId: snapshot.id,
    channelId: data['channel-id'],
    contractAddresses: data['allowed-contracts'],
    name: data.name
  })
}
