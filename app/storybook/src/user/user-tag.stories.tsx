// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { UserTag as Component } from '@echo/ui/components/user/tag/user-tag'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Tag',
  component: Component,
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

export const Tag: StoryObj<typeof Component> = {
  args: {
    user: getAuthUserMockByUsername('crewnft_')
  }
}
