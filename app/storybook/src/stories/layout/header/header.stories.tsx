import { getAuthUser } from '../../../mocks/model/auth-user'
import { Header as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/Header',
  component: Component,
  argTypes: {
    onConnectClick: {
      control: false,
      action: 'clicked'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Header: Story = {
  render: () => <Component user={getAuthUser()} />
}
