// noinspection JSUnusedGlobalSymbols

import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { TokenSelectorManager as Component } from '@echo/ui/components/base/token-selector/token-selector-manager'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Token Selector',
  component: Component,
  render: () => {
    const { connect } = accountStatusStore()
    useEffect(() => {
      connect()
    }, [])
    return <Component />
  }
}
export default metadata
export const TokenSelector: StoryObj<typeof Component> = {}
