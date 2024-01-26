import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { listingLink } from '@echo/bot/listing/listing-link'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { beforeAll, describe, expect, it } from '@jest/globals'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

describe('builders - buildNewListingButtons', () => {
  beforeAll(async () => {
    await initializeTranslations()
  })

  it('should build a new listing button with a link to the listing', () => {
    const listingId = 'listing-id'
    const result = buildListingLinkButton(listingId)
    const expectedLink = listingLink(listingId)
    expect(result).toBeInstanceOf(ActionRowBuilder)
    const components = result.components
    expect(components).toHaveLength(1)

    const expected = {
      emoji: undefined,
      label: i18next.t('listing.button.label'),
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
