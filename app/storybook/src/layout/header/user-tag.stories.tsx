import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { UserTag as Component } from '@echo/ui/components/layout/header/user-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/User Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const UserTag: Story = {
  args: {
    user: authUserMock
  }
}
