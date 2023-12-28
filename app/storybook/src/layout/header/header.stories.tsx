import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { Header as Component } from '@echo/ui/components/layout/header/header'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Header',
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

export const Header: Story = {
  args: {
    user: authUserMock
  }
}
