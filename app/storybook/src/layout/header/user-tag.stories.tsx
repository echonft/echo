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
      username={'johnnycage'}
      pictureUrl={'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.jpg?size=32'}
    />
  )
}
