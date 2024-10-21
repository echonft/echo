// noinspection JSUnusedGlobalSymbols

import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import { TradeCard as Component } from '@echo/ui/components/trade/card/trade-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, prop, take, type NonEmptyArray } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component,
  args: {
    items: pipe(prop('items'), take(1))(getListingMock()) as NonEmptyArray<Erc721Item | Erc1155Item>
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {}
