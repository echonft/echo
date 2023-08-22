import { buildListingEmbed } from '../../src/builders/listing-embed-builder'
import { embedSeparator } from '../../src/helpers/embed/embed-separator'
import { embedValueForNft } from '../../src/helpers/embed/embed-value-for-nft'
import { embedValueForTarget } from '../../src/helpers/embed/embed-value-for-target'
import { listingLink } from '../../src/routing/listing-link'
import { getListingGuild, getListingMockById, Listing } from '@echo/firestore'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/routing/get-base-url')

describe('builders - buildListingEmbed', () => {
  const listingMock = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const listing = {
    ...listingMock,
    targets: [listingMock.targets[0], listingMock.targets[0]]
  } as Listing
  const discordGuild = getListingGuild(listing)
  it('should build an embed with the correct title', () => {
    const result = buildListingEmbed(listing)
    const expectedLink = listingLink(listing.id, discordGuild.discordId)
    const expectedDescription = `Created by <@${listing.creator.discordId}>`
    const expectedTitle = 'A new listing was created'
    const json = result.toJSON()
    expect(json.url).toEqual(expectedLink)
    expect(Number(json.color)).toEqual(0x00ff66)
    expect(json.description).toEqual(expectedDescription)
    expect(json.title).toEqual(expectedTitle)
    expect(json.fields?.length).toEqual(listing.targets.length + listing.items.length + 2)
    expect(json.fields?.[0]).toEqual(embedSeparator())
    expect(json.fields?.[1]).toEqual({
      inline: true,
      name: 'Items for sale',
      value: embedValueForNft(listing.items[0])
    })
    expect(json.fields?.[2]).toEqual({
      inline: true,
      name: '\u200b',
      value: embedValueForNft(listing.items[1]!)
    })
    expect(json.fields?.[3]).toEqual(embedSeparator())
    expect(json.fields?.[4]).toEqual({
      inline: true,
      name: 'Looking for',
      value: embedValueForTarget(listing.targets[0])
    })
    expect(json.fields?.[5]).toEqual({
      inline: true,
      name: '\u200b',
      value: embedValueForTarget(listing.targets[1]!)
    })
  })
})
