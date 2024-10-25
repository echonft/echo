// noinspection JSUnusedGlobalSymbols

import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { HeaderLoggedIn as Component } from '@echo/ui/components/base/header/header-logged-in'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
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

export const LoggedIn: StoryObj<typeof Component> = {
  args: {
    user: userMockJohnny
  }
}
