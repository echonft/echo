import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'

export function collectionResponseMock(): CollectionResponse {
  return {
    contract_address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461',
    name: 'BACGenesis',
    symbol: 'BACG',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    website: 'https://bacgame.io/',
    email: null,
    twitter: 'BAC_Web3',
    discord: null,
    telegram: null,
    github: null,
    instagram: null,
    medium: null,
    logo_url: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    banner_url: null,
    featured_url: null,
    large_image_url: null,
    attributes: [],
    erc_type: 'erc721',
    deploy_block_number: 414712,
    owner: '0x61e2198207f12b0fd094ca7043a7244fd5bfaae8',
    verified: false,
    opensea_verified: false,
    is_spam: false,
    royalty: null,
    items_total: 3000,
    amounts_total: 3000,
    owners_total: 650,
    opensea_floor_price: null,
    opensea_slug: null,
    floor_price: null,
    collections_with_same_name: [],
    price_symbol: 'ETH'
  }
}
