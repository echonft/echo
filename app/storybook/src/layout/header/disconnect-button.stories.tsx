import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { DisconnectButton as Component } from '@echo/ui/components/layout/header/disconnect-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Disconnect Button',
  component: Component,
  argTypes: {
    user: {
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

type Story = StoryObj<typeof Component>

export const DisconnectButton: Story = {
  args: {
    user: authUserMock
  }
}
