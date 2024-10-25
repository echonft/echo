// noinspection JSUnusedGlobalSymbols

import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { authUserStore } from '@echo/storybook/mocks/stores/auth-user-store'
import { LoginDiscordStep as Component } from '@echo/ui/components/auth/login-discord-step'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Discord Step',
  component: Component,
  args: {
    user: undefined
  },
  argTypes: {
    onContinue: {
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

export const NotConnected: StoryObj<typeof Component> = {
  render: ({ onContinue }) => {
    const { user, signOut } = authUserStore()
    useEffect(() => {
      return signOut
    }, [])
    return <Component user={user} onContinue={onContinue} />
  }
}

export const Connected: StoryObj<typeof Component> = {
  render: ({ onContinue }) => {
    const { user, signIn, signOut } = authUserStore()
    useEffect(() => {
      signIn(userMockJohnnyUsername())
      return signOut
    }, [])
    return <Component user={user} onContinue={onContinue} />
  }
}
