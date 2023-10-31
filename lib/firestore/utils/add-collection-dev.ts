import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { type Collection } from '@echo/model/types/collection'
import { formatAddress } from '@echo/utils/helpers/format-address'

const collectionToAdd: Omit<Collection, 'id'> = {
  bannerUrl:
    'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&dpr=1&w=2048',
  blurUrl: 'https://blur.io/collection/boredapeyachtclub',
  contract: {
    address: formatAddress('0x65426F3C04e85936b0F875510d045b413134186A', 11155111),
    chainId: 11155111,
    name: 'BoredApeYachtClub',
    symbol: 'BAYC',
    tokenType: 'ERC721'
  },
  description:
    'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.',
  discordUrl: 'https://discord.gg/3P5K3dzgdB',
  name: 'Bored Ape Yacht Club',
  openSeaUrl: 'https://opensea.io/collection/boredapeyachtclub',
  profilePictureUrl:
    'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=384',
  slug: 'BAYC',
  totalSupply: 9998,
  twitterUsername: 'BoredApeYC',
  verified: true,
  websiteUrl: 'https://boredapeyachtclub.com/'
}

void (async function () {
  initializeFirebase()
  const newCollection = await addCollection(collectionToAdd)
  await addCollectionDiscordGuild(newCollection.id, '1002691062374088794', '1032728052209295450')
  await terminateFirestore()
})()
