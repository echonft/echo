// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { HeaderProfileButton as Component } from '@echo/ui/components/base/header/header-profile-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header/Profile Button',
  component: Component,
  argTypes: {
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

export const ProfileButton: StoryObj<typeof Component> = {
  args: {
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
