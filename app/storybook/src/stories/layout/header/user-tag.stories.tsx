import { getUserById } from '../../../mocks/model/user'
import { UserTag as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/User Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
const user = getUserById('oE6yUEQBPn7PZ89yMjKn')
export const Standard: Story = {
  render: () => <Component user={user} />
}

export const DefaultPicture: Story = {
  render: () => <Component user={assoc('discordAvatar', undefined, user)} />
}
