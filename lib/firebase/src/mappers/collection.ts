import { FirebaseCollection } from '@echo/firebase/model/collection'
import { Collection } from '@echo/model/src/collection'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { DocumentSnapshot as FirestoreDocumentSnapshot } from 'firebase/firestore'
import { isNil } from 'ramda'

/**
 * Map a firebase Collection snapshot to a Collection
 * @param snapshot The document snapshot
 * TODO Typing of the contracts
 */
export async function mapCollection(
  snapshot: DocumentSnapshot<FirebaseCollection> | FirestoreDocumentSnapshot<FirebaseCollection>
): Promise<Collection> {
  const data = snapshot.data()
  if (isNil(data)) {
    return Promise.reject(`No data for ${snapshot.ref.path}`)
  }
  return Promise.resolve({
    discordId: snapshot.id,
    channelId: data['channel-id'],
    contractAddresses: data['allowed-contracts']
  })
}
