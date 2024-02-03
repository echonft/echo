// noinspection JSUnusedGlobalSymbols

import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { Login as Component } from '@echo/ui/components/auth/login'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login',
  component: Component,
  argTypes: {
    onFinish: {
      table: {
        disable: true
      }
    },
    onWalletButtonClick: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

export const Login: StoryObj<typeof Component> = {
  render: ({ onFinish, onWalletButtonClick }) => {
    const { user, signOut } = authUserStore()
    const { connect, disconnect } = accountStatusStore()

    useEffect(() => {
      return () => {
        signOut()
        disconnect()
      }
    }, [])

    return (
      <Component
        onWalletButtonClick={(event) => {
          onWalletButtonClick?.(event)
          connect()
        }}
        user={user}
        onFinish={onFinish}
      />
    )
  }
}
