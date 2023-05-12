import { mockUser } from '@echo/model'
import { UserTag as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata = {
  title: 'Layout/Header/User Tag',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component user={mockUser} />
}

export const DefaultPicture: Story = {
  render: () => <Component user={assoc('discordAvatar', undefined, mockUser)} />
}
