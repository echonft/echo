// noinspection JSUnusedGlobalSymbols

import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { TokenSelector as Component } from '@echo/ui/components/trade/token-selector/token-selector'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Token Selector',
  argTypes: {
    onAddToken: {
      table: {
        disable: true
      }
    }
  },
  component: Component,
  loaders: [authStore.getState().signIn]
}
export default metadata
export const TokenSelector: StoryObj<typeof Component> = {}
