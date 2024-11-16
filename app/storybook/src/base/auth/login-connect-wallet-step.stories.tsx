// noinspection JSUnusedGlobalSymbols

import { accountStatusStore } from '@echo/storybook/mocks/stores/account-status-store'
import { LoginWalletStep as Component } from '@echo/ui/components/auth/login-wallet-step'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Connect Wallet Step',
  component: Component,
  argTypes: {
    onContinue: {
      table: {
        disable: true
      }
    },
    onWalletButtonClick: {
      table: {
        disable: true
      }
    }
  }
}
export default metadata

export const NotConnected: StoryObj<typeof Component> = {
  render: ({ onContinue, onWalletButtonClick }) => {
    const { connect, disconnect } = accountStatusStore()
    useEffect(() => {
      return disconnect
    }, [])
    return (
      <Component
        onWalletButtonClick={(event) => {
          onWalletButtonClick?.(event)
          connect()
        }}
        onContinue={onContinue}
      />
    )
  }
}

export const Connected: StoryObj<typeof Component> = {
  render: ({ onContinue, onWalletButtonClick }) => {
    const { setConnected, disconnect } = accountStatusStore()
    useEffect(() => {
      setConnected()
      return disconnect
    }, [])
    return <Component onWalletButtonClick={onWalletButtonClick} onContinue={onContinue} />
  }
}
