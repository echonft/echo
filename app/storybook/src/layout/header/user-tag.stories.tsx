import { users } from '@echo/model'
import { UserTag as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/User Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component user={users['oE6yUEQBPn7PZ89yMjKn']!} />
}

export const DefaultPicture: Story = {
  render: () => <Component user={assoc('discordAvatar', undefined, users['oE6yUEQBPn7PZ89yMjKn']!)} />
}
