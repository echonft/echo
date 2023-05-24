import { listingLink } from '../../routing/listing-link'
import { buildNewListingButtons } from '../listing-button-builder'
import { requestsForOffer } from '@echo/model'
import { describe, expect, it, jest } from '@jest/globals'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

jest.mock('../../routing/get-base-url')

describe('builders - buildNewListingButtons', () => {
  it('should build a new listing button with a link to the listing', () => {
    const requestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
    const result = buildNewListingButtons(requestForOffer)
    const expectedLink = listingLink(requestForOffer)
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
