import { OwnedNft } from '../../../../types/nft/owned-nft'
import { mockNftCollection } from '../nft-collection/mock-nft-collection'
import { mockUser } from '../user/mock-user'
import dayjs from 'dayjs'

export const mockOwnedNft: OwnedNft = {
  attributes: [
    {
      value: 'Silver Hoop',
      traitType: 'Earring'
    },
    {
      value: 'Orange',
      traitType: 'Background'
    },
    {
      value: 'Robot',
      traitType: 'Fur'
    },
    {
      value: 'Striped Tee',
      traitType: 'Clothes'
    },
    {
      value: 'Discomfort',
      traitType: 'Mouth'
    },
    {
      value: 'X Eyes',
      traitType: 'Eyes'
    }
  ],
  balance: 1,
  collection: mockNftCollection,
  description: undefined,
  id: '1',
  media: [
    {
      raw: new URL('https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ'),
      gateway: new URL(
        'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/eth-mainnet/415d618f5fef7bfe683e02d4653c4289'
      ),
      thumbnail: new URL(
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/415d618f5fef7bfe683e02d4653c4289'
      ),
      bytes: 133270,
      format: 'image/png'
    }
  ],
  owner: mockUser,
  spamInfo: undefined,
  timeLastUpdated: dayjs(),
  title: undefined,
  tokenId: BigInt(0),
  tokenUri: {
    raw: new URL('https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0'),
    gateway: new URL('https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0')
  }
}
