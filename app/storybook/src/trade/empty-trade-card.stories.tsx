// noinspection JSUnusedGlobalSymbols

import { EmptyTradeCard as Component } from '@echo/ui/components/trade/card/empty-trade-card'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component
}

export default metadata

export const Empty: StoryObj<typeof Component> = {}
