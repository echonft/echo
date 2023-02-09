import { Nft } from '../types'
import { mockedCollection } from './nft-collection'
import dayjs from 'dayjs'
import { BigNumber } from 'ethers'

export const mockedNft: Nft = {
  collection: mockedCollection,
  title: undefined,
  description: undefined,
  id: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/6007',
  media: [
    {
      raw: new URL('ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ'),
      gateway: new URL('https://nft-cdn.alchemy.com/eth-mainnet/415d618f5fef7bfe683e02d4653c4289'),
      thumbnail: new URL(
        'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/eth-mainnet/415d618f5fef7bfe683e02d4653c4289'
      ),
      format: 'png',
      bytes: 133270
    }
  ],
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
  spamInfo: undefined,
  timeLastUpdated: dayjs(),
  tokenId: BigNumber.from('0x0000000000000000000000000000000000000000000000000000000000000000'),
  tokenUri: {
    raw: new URL('ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0'),
    gateway: new URL('https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0')
  }
}
