// noinspection JSUnusedGlobalSymbols

import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { UserTag as Component } from '@echo/ui/components/user/profile/user-tag'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'User/Tag',
  component: Component
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    user: pipe(userMockJohnnyUsername, getUserMockByUsername)()
  }
}
