import { NftCollection } from '../../../../types/nft/nft-collection'
import { OpenSeaSafelistRequestStatus } from '../../../../types/nft/open-sea-safelist-request-status'
import { mockContract } from '../contract/mock-contract'
import dayjs from 'dayjs'

export const mockNftCollection: NftCollection = {
  id: 'Rc8pLQXxgyQGIRL0fr13',
  contract: mockContract,
  openSea: {
    floorPrice: 73.1,
    collectionName: 'Bored Ape Yacht Club',
    safelistRequestStatus: OpenSeaSafelistRequestStatus.VERIFIED,
    imageUrl: new URL(
      'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&w=3840'
    ),
    description:
      'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.',
    externalUrl: new URL('https://boredapeyachtclub.com/'),
    twitterUsername: 'BoredApeYC',
    discordUrl: new URL('https://discord.gg/3P5K3dzgdB'),
    lastIngestedAt: dayjs.unix(1676984897)
  },
  totalSupply: 10000
}
