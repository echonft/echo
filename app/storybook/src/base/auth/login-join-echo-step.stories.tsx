// noinspection JSUnusedGlobalSymbols

import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
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
    username: USER_MOCK_JOHNNY_USERNAME
  }
}
