import { Header as Component } from '@echo/ui/components/layout/header/header'
import { getAuthUser } from '@mocks/model/auth-user'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Header',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Header: Story = {
  args: {
    user: getAuthUser()
  }
}
