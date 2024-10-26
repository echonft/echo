// noinspection JSUnusedGlobalSymbols

import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { LoginJoinEchoStep as Component } from '@echo/ui/components/auth/login-join-echo-step'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Login/Join Echo Step',
  component: Component,
  argTypes: {
    onSkip: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['username']
    }
  }
}

export default metadata

export const JoinEchoStep: StoryObj<typeof Component> = {
  args: {
    username: userMockJohnny.username
  }
}
