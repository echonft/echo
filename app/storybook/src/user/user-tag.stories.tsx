// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { UserTag as Component } from '@echo/ui/components/user/tag/user-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Discord Tag',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const UserTag: Story = {
  args: {
    user: getAuthUserMockByUsername('crewnft_')
  }
}
