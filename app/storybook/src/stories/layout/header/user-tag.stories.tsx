import { getAuthUser } from '../../../mocks/model/auth-user'
import { UserTag as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { dissoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Layout/Header/User Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
export const Standard: Story = {
  render: () => <Component user={getAuthUser()} />
}

export const DefaultPicture: Story = {
  render: () => <Component user={dissoc('discordAvatar', getAuthUser())} />
}
