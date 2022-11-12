import { Nft, NftContract, NftTokenType } from 'alchemy-sdk'

export const mockNfts: Nft[] = [
  {
    contract: {
      address: '0x10ba8353dd37c75384f09aeb630214d9f19258b0',
      tokenType: NftTokenType.ERC721,
    },
    tokenType: NftTokenType.ERC721,
    tokenId: '0x05',
    title: '',
    description: '',
    tokenUri: {
      raw: 'ipfs://QmQ1X8kQrthjQEqtYcEwK3PjN3fZUqZwL4xJEjamo2oDJR/{id}.json',
      gateway: 'https://ipfs.io/ipfs/QmQ1X8kQrthjQEqtYcEwK3PjN3fZUqZwL4xJEjamo2oDJR/%7Bid%7D.json',
    },
    media: [
      {
        raw: '',
        gateway: '',
      },
    ],
    timeLastUpdated: '2022-06-28T05:35:54.894Z',
    metadataError: 'Token uri responded with a non 200 response code',
    rawMetadata: undefined,
  },
  {
    contract: {
      address: '0x12c63bbd266db84e117356e664f3604055166cec',
      tokenType: NftTokenType.ERC721,
    },
    tokenId: '0x000000000000000000000000000000000000000000000000000000000000042a',
    tokenType: NftTokenType.ERC721,
    title: 'Magma Elemental #51',
    description: 'The divine expression and personification of Magma',
    tokenUri: {
      raw: 'ipfs://QmZdymhm43efeG86ekjQwhPnokEKT9PDyYcrcxeQJez5E9/1066',
      gateway: 'https://ipfs.io/ipfs/QmZdymhm43efeG86ekjQwhPnokEKT9PDyYcrcxeQJez5E9/1066',
    },
    media: [
      {
        raw: 'ipfs://Qmbs8xxZq5ckuXgK449dfDtKRHoYzGHrU44E8ydj8xsQdp',
        gateway: 'https://res.cloudinary.com/alchemyapi/image/upload/mainnet/78abafcfe68274376db349c66223eb93.png',
        thumbnail:
          'https://res.cloudinary.com/alchemyapi/image/upload/w_256,h_256/mainnet/78abafcfe68274376db349c66223eb93.png',
      },
    ],
    rawMetadata: {
      name: 'Magma Elemental #51',
      description: 'The divine expression and personification of Magma',
      image: 'ipfs://Qmbs8xxZq5ckuXgK449dfDtKRHoYzGHrU44E8ydj8xsQdp',
      attributes: [
        {
          value: 'Magma',
          trait_type: 'Elemental',
        },
        {
          value: 'Sunfall Oni',
          trait_type: 'Face Mask',
        },
        {
          value: 'Primordial Landscape',
          trait_type: 'Background',
        },
        {
          value: 'Magma Base',
          trait_type: 'Skin',
        },
        {
          value: 'Volcanic Flow',
          trait_type: 'Hair',
        },
        {
          value: 'Mark Of Caldera Pink',
          trait_type: 'Tattoo',
        },
        {
          value: 'Glowing',
          trait_type: 'Eyes',
        },
      ],
    },
    timeLastUpdated: '2022-06-20T01:56:34.789Z',
    metadataError: undefined,
  },
  {
    contract: {
      address: '0x2106c00ac7da0a3430ae667879139e832307aeaa',
      tokenType: NftTokenType.ERC721,
    },
    tokenId: '0x0000000000000000000000000000000000000000000000000000000000001cad',
    tokenType: NftTokenType.ERC721,
    title: 'Loopy Donut #7341',
    description: '',
    tokenUri: {
      raw: 'ipfs://QmZrvjYcwZ4P5DMiY4Gv9T8W1Pf7DuLpqc6JSdmKxG3n6h/231.json',
      gateway: 'https://ipfs.io/ipfs/QmZrvjYcwZ4P5DMiY4Gv9T8W1Pf7DuLpqc6JSdmKxG3n6h/231.json',
    },
    media: [
      {
        raw: 'ipfs://QmSNmVFTJv6cG9M8ZRU8T9F4Kz9HHxmV85ssGP5W8ZsTPa/7341.png',
        gateway: 'https://ipfs.io/ipfs/QmSNmVFTJv6cG9M8ZRU8T9F4Kz9HHxmV85ssGP5W8ZsTPa/7341.png',
      },
    ],
    rawMetadata: {
      name: 'Loopy Donut #7341',
      image: 'ipfs://QmSNmVFTJv6cG9M8ZRU8T9F4Kz9HHxmV85ssGP5W8ZsTPa/7341.png',
      attributes: [
        {
          value: 'Yellow',
          trait_type: 'Background',
        },
        {
          value: 'Donut Body',
          trait_type: 'Base',
        },
        {
          value: 'Starcandy',
          trait_type: 'Glaze',
        },
        {
          value: 'Goose',
          trait_type: 'Headgear',
        },
        {
          value: 'Sunglasses',
          trait_type: 'Eyes',
        },
        {
          value: 'VS Red',
          trait_type: 'Accessory',
        },
      ],
      external_url: 'https://loopyland.club/collection/donut/7341',
      sha256: '33e605877e192dff3efa1cff1c471a2da77cf5f285d6c478c66952239a94aec4',
    },
    timeLastUpdated: '2022-02-17T18:16:31.533Z',
    metadataError: undefined,
  },
  {
    contract: {
      address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
      tokenType: NftTokenType.ERC1155,
    },
    tokenId: '0x3847d952429882301f1a7452e0e8a912be064e46000000000000ef0000000001',
    tokenType: NftTokenType.ERC1155,
    description: 'A doge',
    title: 'DogeLife#00236',
    tokenUri: {
      raw: 'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x{id}',
      gateway:
        'https://api.opensea.io/api/v1/metadata/0x495f947276749ce646f68ac8c248420045cb7b5e/25456465558948412922313172332284700899581043147845045126166051515753528557569',
    },
    media: [
      {
        raw: 'https://lh3.googleusercontent.com/v45jqPCxlKLGH2n8BRQJ_cQjz-RcCVrGnz8LGJaaYGZt86TmhIHSC3hWX3g_eEanjH3D4kPXfWXsv5YeLSa2VDTPZi701JpAFaKl',
        gateway:
          'https://lh3.googleusercontent.com/v45jqPCxlKLGH2n8BRQJ_cQjz-RcCVrGnz8LGJaaYGZt86TmhIHSC3hWX3g_eEanjH3D4kPXfWXsv5YeLSa2VDTPZi701JpAFaKl',
      },
    ],
    rawMetadata: {
      name: 'DogeLife#00236',
      image:
        'https://lh3.googleusercontent.com/v45jqPCxlKLGH2n8BRQJ_cQjz-RcCVrGnz8LGJaaYGZt86TmhIHSC3hWX3g_eEanjH3D4kPXfWXsv5YeLSa2VDTPZi701JpAFaKl',
    },
    timeLastUpdated: '2022-05-24T06:36:17.216Z',
    metadataError: undefined,
  },
  {
    contract: {
      address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
      tokenType: NftTokenType.ERC1155,
    },
    tokenId: '0x3847d952429882301f1a7452e0e8a912be064e46000000000000f10000000001',
    tokenType: NftTokenType.ERC1155,
    title: 'DogeLife#00238',
    description: 'A doge',
    tokenUri: {
      raw: 'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x{id}',
      gateway:
        'https://api.opensea.io/api/v1/metadata/0x495f947276749ce646f68ac8c248420045cb7b5e/25456465558948412922313172332284700899581043147845045126166051517952551813121',
    },
    media: [
      {
        raw: 'https://lh3.googleusercontent.com/5Gs9gCZBf6ESOScYCrHhdzFuQO_GDW3qmXBY-T5FzsPp1FjWegVevhewtMlKCODgZ7C1mOVE9scdWYD4z5Tgu-HaHgfLIh-J3HOtBQ',
        gateway:
          'https://lh3.googleusercontent.com/5Gs9gCZBf6ESOScYCrHhdzFuQO_GDW3qmXBY-T5FzsPp1FjWegVevhewtMlKCODgZ7C1mOVE9scdWYD4z5Tgu-HaHgfLIh-J3HOtBQ',
      },
    ],
    rawMetadata: {
      name: 'DogeLife#00238',
      image:
        'https://lh3.googleusercontent.com/5Gs9gCZBf6ESOScYCrHhdzFuQO_GDW3qmXBY-T5FzsPp1FjWegVevhewtMlKCODgZ7C1mOVE9scdWYD4z5Tgu-HaHgfLIh-J3HOtBQ',
    },
    timeLastUpdated: '2022-05-18T05:57:08.211Z',
    metadataError: undefined,
  },
  {
    contract: {
      address: '0x6e92a68f85464a47491331945825a5745066b771',
      tokenType: NftTokenType.ERC721,
    },
    tokenId: '0x000000000000000000000000000000000000000000000000000000000000037c',
    tokenType: NftTokenType.ERC721,
    title: 'nerd.jpg #893',
    description: '',
    tokenUri: {
      raw: 'ipfs://QmW5dPt9e6wiGDwRLAQYdqtEuvKAF7CT56ViYPVsirmUqE/893.json',
      gateway: 'https://ipfs.io/ipfs/QmW5dPt9e6wiGDwRLAQYdqtEuvKAF7CT56ViYPVsirmUqE/893.json',
    },
    media: [
      {
        raw: 'ipfs://QmULybzaE6s3jZmfuCqt33RvFvNUt4TZc3BcLgJzVbsqUf/893.png',
        gateway: 'https://ipfs.io/ipfs/QmULybzaE6s3jZmfuCqt33RvFvNUt4TZc3BcLgJzVbsqUf/893.png',
      },
    ],
    rawMetadata: {
      name: 'nerd.jpg #893',
      image: 'ipfs://QmULybzaE6s3jZmfuCqt33RvFvNUt4TZc3BcLgJzVbsqUf/893.png',
      edition: 893,
      attributes: [
        {
          value: 'panic',
          trait_type: 'background',
        },
        {
          value: 'none',
          trait_type: 'landscape',
        },
        {
          value: 'tan',
          trait_type: 'skin',
        },
        {
          value: 'yellow_long_sleeve',
          trait_type: 'clothes',
        },
        {
          value: 'nerdpod',
          trait_type: 'accessory',
        },
        {
          value: 'yahoo',
          trait_type: 'mouth',
        },
        {
          value: 'bald',
          trait_type: 'head',
        },
        {
          value: 'purple',
          trait_type: 'glasses',
        },
      ],
      dna: 'd91e028357cdb74e39c35c72d410e8a9c5efae19',
    },
    timeLastUpdated: '2022-06-24T11:33:01.651Z',
    metadataError: undefined,
  },
  {
    contract: {
      address: '0xce82d65314502ce39472a2442d4a2cbc4cb9f293',
      tokenType: NftTokenType.ERC721,
    },
    tokenId: '0x000000000000000000000000000000000000000000000000000000000000106d',
    tokenType: NftTokenType.ERC721,
    title: 'Animal Society #4205',
    description: 'End the Jpeg Animal NFT Civil War, Unite All Jpeg Animals in one NFT Society.',
    tokenUri: {
      raw: 'http://159.223.120.163/api/metadata/4205',
      gateway: 'http://159.223.120.163/api/metadata/4205',
    },
    media: [
      {
        raw: 'http://159.223.120.163/nfts/1861.png',
        gateway: 'https://res.cloudinary.com/alchemyapi/image/upload/mainnet/e74197c65033f09a3121c30e5b39187d.png',
        thumbnail:
          'https://res.cloudinary.com/alchemyapi/image/upload/w_256,h_256/mainnet/e74197c65033f09a3121c30e5b39187d.png',
      },
    ],
    rawMetadata: {
      name: 'Animal Society #4205',
      description: 'End the Jpeg Animal NFT Civil War, Unite All Jpeg Animals in one NFT Society.',
      image: 'http://159.223.120.163/nfts/1861.png',
      attributes: [
        {
          value: 'Sulu',
          trait_type: 'Background',
        },
        {
          value: 'Ghost',
          trait_type: 'Type',
        },
        {
          value: 'None',
          trait_type: 'Outfit',
        },
        {
          value: 'None',
          trait_type: 'Wrist',
        },
        {
          value: 'None',
          trait_type: 'Glasses',
        },
        {
          value: 'None',
          trait_type: 'Necklace',
        },
        {
          value: 'Donut',
          trait_type: 'Hat',
        },
        {
          value: 'None',
          trait_type: 'Headband',
        },
        {
          value: 'Tennis ball',
          trait_type: 'Hand',
        },
      ],
    },
    timeLastUpdated: '2022-06-28T03:21:22.291Z',
    metadataError: undefined,
  },
]

export const mockContractMetadata: { [key: string]: NftContract } = {
  '0x12c63bbd266db84e117356e664f3604055166cec': {
    address: '0x12c63bbd266db84e117356e664f3604055166cec',
    name: 'Mythics Genesis',
    symbol: 'MGEN',
    totalSupply: '1077',
    tokenType: NftTokenType.ERC721,
  },
  '0x2106c00ac7da0a3430ae667879139e832307aeaa': {
    address: '0x2106c00ac7da0a3430ae667879139e832307aeaa',
    name: 'Loopy Donuts',
    symbol: 'DONUT',
    totalSupply: '10000',
    tokenType: NftTokenType.ERC721,
  },
  '0x495f947276749ce646f68ac8c248420045cb7b5e': {
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    name: 'OpenSea Shared Storefront',
    symbol: 'OPENSTORE',
    tokenType: NftTokenType.ERC1155,
  },
  '0x6e92a68f85464a47491331945825a5745066b771': {
    address: '0x6e92a68f85464a47491331945825a5745066b771',
    name: 'nerdsJPG',
    symbol: 'NRD',
    totalSupply: '908',
    tokenType: NftTokenType.ERC721,
  },
  '0xce82d65314502ce39472a2442d4a2cbc4cb9f293': {
    address: '0xce82d65314502ce39472a2442d4a2cbc4cb9f293',
    name: 'Animal Society',
    symbol: 'AS',
    totalSupply: '7777',
    tokenType: NftTokenType.ERC721,
  },
}
