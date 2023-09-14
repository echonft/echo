import { buildNewListingButtons } from '@echo/bot/builders/listing-button-builder'
import { listingLink } from '@echo/bot/routing/listing-link'
import { describe, expect, it } from '@jest/globals'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

describe('builders - buildNewListingButtons', () => {
  it('should build a new listing button with a link to the listing', () => {
    const listingId = 'listingId'
    const guildId = 'guildId'
    const result = buildNewListingButtons(listingId, guildId)
    const expectedLink = listingLink(listingId, guildId)
    expect(result).toBeInstanceOf(ActionRowBuilder)
    const components = result.components
    expect(components).toHaveLength(1)

    const expected = {
      emoji: undefined,
      label: 'View on Echo',
      style: ButtonStyle.Link,
      type: 2,
      url: expectedLink
    }
    const newListingButton = components[0]
    expect(newListingButton).toBeInstanceOf(ButtonBuilder)
    const json = newListingButton?.toJSON()
    expect(json).toEqual(expected)
  })
})
