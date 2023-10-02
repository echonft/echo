import { UserTag as Component } from '@echo/ui/components/layout/header/user-tag'
import { getAuthUser } from '@mocks/model/auth-user'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/User Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const UserTag: Story = {
  args: {
    user: getAuthUser()
  }
}
