import { TokenType } from '@echo/model/constants/token-type'
import type { Collection } from '@echo/model/types/collection'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { collectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('validators - collectionResponseSchema', () => {
  const collectionResponseMock: CollectionResponse = {
    contract_address: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461',
    name: 'BACGenesis',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    website: 'https://bacgame.io/',
    twitter: 'BAC_Web3',
    discord: null,
    logo_url: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    erc_type: TokenType.Erc721,
    is_spam: false,
    items_total: 3000,
    opensea_slug: null
  }

  const expectedResult: Collection = {
    contract: '0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461',
    name: 'BACGenesis',
    slug: 'bacgenesis',
    totalSupply: 3000,
    pictureUrl: 'https://image.nftscan.com/blast/logo/0xcfc4c2b14af5b1f8ed97e1717b009dca461d8461.jpg',
    websiteUrl: 'https://bacgame.io/',
    description:
      'Blast Auto Club, the first Web3 game built on Blast blockchain. BAC is a\nlight educational, HTML5 racing club game. BAC(Blast Auto Club) is the\n1st game of a series of Web3 casual games on Blast. BAC use a team\nbattler combat model called “Group to Earn”, which is the most unique\nfeature of the game.',
    twitterUsername: 'BAC_Web3',
    type: TokenType.Erc721
  }

  it('maps correctly with no slug', () => {
    expect(collectionResponseSchema.parse(collectionResponseMock)).toStrictEqual({
      collection: expectedResult,
      isSpam: false
    })
  })

  it('maps correctly with no slug name with space', () => {
    const response = assoc('name', 'Name With Space', collectionResponseMock)
    const resultWithSlug = pipe(assoc('name', 'Name With Space'), assoc('slug', 'name-with-space'))(expectedResult)
    expect(collectionResponseSchema.parse(response)).toStrictEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('maps correctly with slug', () => {
    const response = assoc('opensea_slug', 'opensea-slug', collectionResponseMock)
    const resultWithSlug = assoc('slug', 'opensea-slug', expectedResult)
    expect(collectionResponseSchema.parse(response)).toStrictEqual({ collection: resultWithSlug, isSpam: false })
  })

  it('returns isSpam true if the collection is a spam collection', () => {
    const response = assoc('is_spam', true, collectionResponseMock)
    expect(collectionResponseSchema.parse(response)).toStrictEqual({ collection: undefined, isSpam: true })
  })

  it('SEI test', () => {
    const response = {
      contract_address: '0x4f449569f9cfd517eacbc3e3302d45970812abb7',
      name: 'AHOY FUCKERS!!!',
      symbol: 'AFCKR',
      description:
        'YRRRRR!! LETS FUCKING GO FUCKERS!!! SOME COMMEMORATIVE ART FOR THE CULTURE!!! FIND THE OG FUCKERS [HERE](https://mrkt.exchange/collection/sei1lqsrwexmpve6ltu8pga8ss0jzvgx9r88n6ys9fedjk6dqny72h3q7myv5d)\n',
      website: 'https://yrrrrrlabz.vercel.app/',
      email: null,
      twitter: 'SeiFuckers',
      discord: 'https://discord.gg/8Svc2aW5za',
      telegram: null,
      github: null,
      instagram: null,
      medium: null,
      logo_url: 'https://i.seadn.io/s/raw/files/dee8e71643fa7664aca74ee8cfa4fff7.webp?w=500&auto=format',
      banner_url: null,
      featured_url: null,
      large_image_url: null,
      attributes: [
        {
          attributes_name: 'limited edition',
          attributes_values: [{ attributes_value: 'PIRATE FUCKERS', total: 666 }],
          total: 1
        }
      ],
      erc_type: 'erc721',
      deploy_block_number: 80711994,
      owner: '0x83cd6864eafd761c882ea038cab95b011cdff731',
      verified: false,
      opensea_verified: false,
      is_spam: false,
      royalty: null,
      items_total: 666,
      amounts_total: 666,
      owners_total: 433,
      opensea_floor_price: null,
      opensea_slug: 'ahoyfuckers',
      floor_price: null,
      collections_with_same_name: [],
      price_symbol: 'SEI'
    }
    const expected: Collection = {
      contract: '0x4f449569f9cfd517eacbc3e3302d45970812abb7',
      description:
        'YRRRRR!! LETS FUCKING GO FUCKERS!!! SOME COMMEMORATIVE ART FOR THE CULTURE!!! FIND THE OG FUCKERS [HERE](https://mrkt.exchange/collection/sei1lqsrwexmpve6ltu8pga8ss0jzvgx9r88n6ys9fedjk6dqny72h3q7myv5d)\n',
      discordUrl: 'https://discord.gg/8Svc2aW5za',
      name: 'AHOY FUCKERS!!!',
      pictureUrl: 'https://i.seadn.io/s/raw/files/dee8e71643fa7664aca74ee8cfa4fff7.webp',
      slug: 'ahoyfuckers',
      totalSupply: 666,
      twitterUsername: 'SeiFuckers',
      type: TokenType.Erc721,
      websiteUrl: 'https://yrrrrrlabz.vercel.app/'
    }
    expect(collectionResponseSchema.parse(response)).toStrictEqual({ collection: expected, isSpam: false })
  })
})
