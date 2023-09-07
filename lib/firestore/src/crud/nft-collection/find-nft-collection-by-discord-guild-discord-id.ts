import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { firestore } from '../../services/firestore'
import { NftCollection } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export async function findNftCollectionByDiscordGuildDiscordId(guildDiscordId: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('discordGuild.discordId', '==', guildDiscordId)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head(querySnapshot.docs) as QueryDocumentSnapshot<NftCollection>
  if (isNil(documentSnapshot)) {
    return undefined
  }
  return documentSnapshot.data()
}
