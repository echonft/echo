// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { DisconnectButton as Component } from '@echo/ui/components/base/header/disconnect-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header/Disconnect Button',
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

export const DisconnectButton: StoryObj<typeof Component> = {
  args: {
    user: getAuthUserMockByUsername('johnnycagewins')
  }
}
