import { buildListingLinkButton } from '@echo/bot/listing/build-listing-link-button'
import { initializeTranslations } from '@echo/bot/messages/initialize-translations'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { beforeAll, describe, expect, it } from '@jest/globals'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import i18next from 'i18next'

describe('builders - buildNewListingButtons', () => {
  beforeAll(async () => {
    await initializeTranslations()
  })

  it('should build a new listing button with a link to the listing', () => {
    const result = buildListingLinkButton(listingMock)
    const expectedLink = pathProvider.collection.default
      .withQuery({ listing: listingMock })
      .getUrl({ slug: listingMock.target.collection.slug })
    expect(result).toBeInstanceOf(ActionRowBuilder)
    const components = result.components
    expect(components).toHaveLength(1)

    const expected = {
      emoji: undefined,
      label: i18next.t('listing.button'),
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
