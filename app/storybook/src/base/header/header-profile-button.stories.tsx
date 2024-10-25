// noinspection JSUnusedGlobalSymbols

import '@echo/ui-css/index.css'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
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
    user: getUserDocumentDataMockByUsername(userMockJohnnyUsername())
  }
}
