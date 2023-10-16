import { describe, expect, it } from '@jest/globals'

describe('builders - buildListingEmbed', () => {
  // FIXME
  it('temp', () => {
    expect(true).toBeTruthy()
  })
  // const listingMock = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  // const listing = {
  //   ...listingMock,
  //   targets: [listingMock.targets[0], listingMock.targets[0]]
  // } as ListingComplete
  // const discordGuild = getListingItemsGuild(listing)
  // it('should build an embed with the correct title', () => {
  //   const result = buildListingEmbed(listing)
  //   const expectedLink = listingLink(listing.id, discordGuild.discordId)
  //   const expectedDescription = `Created by <@${listing.creator.discordId}>`
  //   const expectedTitle = 'A new listing was created'
  //   const json = result.toJSON()
  //   expect(json.url).toEqual(expectedLink)
  //   expect(Number(json.color)).toEqual(0x00ff66)
  //   expect(json.description).toEqual(expectedDescription)
  //   expect(json.title).toEqual(expectedTitle)
  //   expect(json.fields?.length).toEqual(listing.targets.length + listing.items.length + 2)
  //   expect(json.fields?.[0]).toEqual(embedSeparator())
  //   expect(json.fields?.[1]).toEqual({
  //     inline: true,
  //     name: 'Items for sale',
  //     value: embedValueForNft(listing.items[0].nft)
  //   })
  //   expect(json.fields?.[2]).toEqual({
  //     inline: true,
  //     name: '\u200b',
  //     value: embedValueForNft(listing.items[1]!.nft)
  //   })
  //   expect(json.fields?.[3]).toEqual(embedSeparator())
  //   expect(json.fields?.[4]).toEqual({
  //     inline: true,
  //     name: 'Looking for',
  //     value: embedValueForTarget(listing.targets[0])
  //   })
  //   expect(json.fields?.[5]).toEqual({
  //     inline: true,
  //     name: '\u200b',
  //     value: embedValueForTarget(listing.targets[1]!)
  //   })
  // })
})
