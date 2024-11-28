// noinspection JSUnusedGlobalSymbols

import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { Header as Component } from '@echo/ui/components/base/header/header'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component,
  parameters: {
    controls: {
      exclude: ['options']
    }
  }
}

export default metadata

export const Plain: StoryObj<typeof Component> = {
  args: {
    options: HeaderStyle.Plain
  }
}

export const LoggedIn: StoryObj<typeof Component> = {
  args: {
    options: HeaderStyle.Default
  },
  loaders: [authStore.getState().signIn]
}

export const LoggedOut: StoryObj<typeof Component> = {
  args: {
    options: HeaderStyle.Default
  },
  loaders: [authStore.getState().signOut]
}
