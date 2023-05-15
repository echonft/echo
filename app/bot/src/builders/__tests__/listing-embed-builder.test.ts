import { listingLink } from '../../routing/listing-link'
import { embedSeparator } from '../../utils/embed/embed-separator'
import { embedValueForOfferItem } from '../../utils/embed/embed-value-for-offer-item'
import { embedValueForTarget } from '../../utils/embed/embed-value-for-target'
import { buildListingEmbed } from '../listing-embed-builder'
import { mockRequestForOffer } from '@echo/model'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../../routing/get-base-url')

describe('builders - buildListingEmbed', () => {
  const listing = { ...mockRequestForOffer, target: mockRequestForOffer.target.concat(mockRequestForOffer.target) }
  it('should build an embed with the correct title', () => {
    const result = buildListingEmbed(listing)
    const expectedLink = listingLink(listing)
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
      value: embedValueForOfferItem(listing.items?.[0]!)
    })
    expect(json.fields?.[2]).toEqual({
      inline: true,
      name: '\u200b',
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: embedValueForOfferItem(listing.items?.[1]!)
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
