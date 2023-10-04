import { addNftCollection } from '@echo/firestore/crud/nft-collection/add-nft-collection'
import { addNftCollectionDiscordGuild } from '@echo/firestore/crud/nft-collection-discord-guild/add-nft-collection-discord-guild'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'

const collectionToAdd: Omit<FirestoreNftCollection, 'id'> = {
  bannerUrl: new URL(
    'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&dpr=1&w=2048'
  ),
  blurUrl: new URL('https://blur.io/collection/boredapeyachtclub'),
  contract: {
    address: '0x65426F3C04e85936b0F875510d045b413134186A',
    chainId: 11155111,
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    tokenType: 'ERC721'
  },
  description:
    'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.',
  discordUrl: new URL('https://discord.gg/3P5K3dzgdB'),
  name: 'Bored Ape Yacht Club',
  openSeaUrl: new URL('https://opensea.io/collection/boredapeyachtclub'),
  profilePictureUrl: new URL(
    'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=384'
  ),
  slug: 'BAYC',
  totalSupply: 9998,
  twitterUsername: 'BoredApeYC',
  verified: true,
  websiteUrl: new URL('https://boredapeyachtclub.com/')
}

void (async function () {
  initializeFirebase()
  const newCollection = await addNftCollection(collectionToAdd)
  await addNftCollectionDiscordGuild(newCollection.id, '1002691062374088794', '1032728052209295450')
  await terminateFirestore()
})()
