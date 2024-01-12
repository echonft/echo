import { LoginJoinEchoStep as Component } from '@echo/ui/components/auth/login-join-echo-step'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login/Join Echo Step',
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

type Story = StoryObj<typeof Component>

export const JoinEchoStep: Story = {
  args: {
    username: 'johnnycagewins'
  }
}
