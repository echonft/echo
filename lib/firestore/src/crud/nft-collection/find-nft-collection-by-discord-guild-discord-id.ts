import { CollectionName } from '../../constants/collection-name'
import { nftCollectionDataConverter } from '../../converters/nft-collection-data-converter'
import { NftCollection } from '../../types/model/nft-collection'
import { firestore } from 'firebase-admin'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export const findNftCollectionByDiscordGuildDiscordId = async (guildDiscordId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('discordGuild.discordId', '==', guildDiscordId)
    .withConverter(nftCollectionDataConverter)
    .get()

  if (querySnapshot.empty) {
    return undefined
  }

  const documentSnapshot = head<QueryDocumentSnapshot<NftCollection>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return undefined
  }
  return documentSnapshot.data()
}
