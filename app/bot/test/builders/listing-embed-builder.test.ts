import { buildListingEmbed } from '../../src/builders/listing-embed-builder'
import { listingLink } from '../../src/routing/listing-link'
import { embedSeparator } from '../../src/utils/embed/embed-separator'
import { embedValueForNft } from '../../src/utils/embed/embed-value-for-nft'
import { embedValueForTarget } from '../../src/utils/embed/embed-value-for-target'
import { Offer } from '@echo/firestore'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('builders - buildListingEmbed', () => {
  const mockRequestForOffer: Offer = {
    id: 'jUzMtPGKM62mMhEcmbN4',
    sender: {
      discordId: 'senderDiscordId'
    },
    items: [
      {
        id: '8hHFadIrrooORfTOLkBg',
        collection: {
          id: '1aomCtnoesD7WVll6Yi1',
          name: 'Spiral Frequencies'
        },
        name: 'Spiral Frequencies #1376',
        tokenId: 1376
      },
      {
        id: 'QFjMRNChUAHNswkRADXh',
        collection: {
          id: 'Rc8pLQXxgyQGIRL0fr13',
          name: 'pxMythics Genesis'
        },
        name: 'Creative Demigod #024',
        tokenId: 17
      }
    ],
    discordGuild: {
      id: 'xA40abnyBq6qQHSYmtHj',
      discordId: '1',
      channelId: '1',
      name: 'Spiral Frequencies'
    },
    target: [
      {
        id: '37dBlwJYahEAKeL0rNP8',
        tokenType: 'ERC721',
        address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
        chainId: 1,
        name: 'Mythics Genesis',
        symbol: 'MGEN'
      }
    ]
  } as unknown as Offer
  const listing = { ...mockRequestForOffer, target: mockRequestForOffer.target.concat(mockRequestForOffer.target) }
  it('should build an embed with the correct title', () => {
    const result = buildListingEmbed(listing)
    const expectedLink = listingLink(listing.id, listing.discordGuild.discordId)
    const expectedDescription = `Created by <@${listing.sender.discordId}>`
    const expectedTitle = 'A new listing was created'
    const json = result.toJSON()
    expect(json.url).toEqual(expectedLink)
    expect(Number(json.color)).toEqual(0x00ff66)
    expect(json.description).toEqual(expectedDescription)
    expect(json.title).toEqual(expectedTitle)
    expect(json.fields?.length).toEqual(listing.target.length + listing.items.length + 2)
    expect(json.fields?.[0]).toEqual(embedSeparator())
    expect(json.fields?.[1]).toEqual({
      inline: true,
      name: 'Items for sale',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: embedValueForNft(listing.items?.[0]!)
    })
    expect(json.fields?.[2]).toEqual({
      inline: true,
      name: '\u200b',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: embedValueForNft(listing.items?.[1]!)
    })
    expect(json.fields?.[3]).toEqual(embedSeparator())
    expect(json.fields?.[4]).toEqual({
      inline: true,
      name: 'Looking for',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: embedValueForTarget(listing.target?.[0]!)
    })
    expect(json.fields?.[5]).toEqual({
      inline: true,
      name: '\u200b',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: embedValueForTarget(listing.target?.[1]!)
    })
  })
})
