import { LoginButton as Component } from '@echo/ui/components/auth/login-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Button',
  component: Component,
  argTypes: {
    onClick: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['children']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const LoginButton: Story = {
  args: {
    children: 'Login'
  }
}
