// noinspection JSUnusedGlobalSymbols

import type { AuthUser } from '@echo/model/types/auth-user'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { LoginDiscordStep as Component } from '@echo/ui/components/auth/login-discord-step'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Discord Step',
  component: Component,
  argTypes: {
    onContinue: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['provider', 'user']
    }
  }
}

export default metadata

export const NotConnected: StoryObj<typeof Component> = {
  args: {
    user: undefined
  },
  render: ({ onContinue }) => {
    const [user, setUser] = useState<AuthUser>()
    const signIn = () => {
      setTimeout(() => {
        setUser(getAuthUserMockByUsername('crewnft_'))
      }, 1200)
      return Promise.resolve(undefined)
    }
    return <Component user={user} provider={{ signIn }} onContinue={onContinue} />
  }
}

export const Connected: StoryObj<typeof Component> = {
  args: {
    provider: {
      signIn: () => Promise.resolve(undefined)
    },
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
