import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { LoginFlow as Component } from '@echo/ui/components/auth/login-flow'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Auth/Login Flow',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {}

export const WithUser: Story = {
  args: {
    user: authUserMock
  }
}
