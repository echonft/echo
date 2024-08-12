// noinspection JSUnusedGlobalSymbols

import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { TokenSelector as Component } from '@echo/ui/components/base/token-selector/token-selector'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Token Selector',
  argTypes: {
    onAddToken: {
      table: {
        disable: true
      }
    }
  },
  component: Component,
  render: ({ onAddToken }) => {
    const { connect } = accountStatusStore()
    useEffect(() => {
      connect()
    }, [])
    return <Component onAddToken={onAddToken} />
  }
}
export default metadata
export const TokenSelector: StoryObj<typeof Component> = {}
