// noinspection JSUnusedGlobalSymbols

import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import { TradeCard as Component } from '@echo/ui/components/trade/card/trade-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component,
  args: {
    items: pipe(prop('items'))(getListingMock())
  }
}

export default metadata

export const Stack: StoryObj<typeof Component> = {}
