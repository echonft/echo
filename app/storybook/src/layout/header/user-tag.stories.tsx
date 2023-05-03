import { User } from '@echo/model'
import { UserTag as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Layout/Header/User Tag',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const UserTag: Story = {
  render: () => (
    <Component
      user={
        {
          discordUsername: 'johnnycage',
          discordAvatar: '6b3df6d9a8b5ab523fa24a71aca8160d',
          discordId: '462798252543049728'
        } as User
      }
    />
  )
}
