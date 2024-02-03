// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { HeaderLoggedIn as Component } from '@echo/ui/components/base/header/header-logged-in'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component,
  argTypes: {
    onSignOut: {
      table: {
        disable: true
      }
    },
    onWalletButtonClick: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['user']
    }
  }
}

export default metadata

export const LoggedIn: StoryObj<typeof Component> = {
  args: {
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
