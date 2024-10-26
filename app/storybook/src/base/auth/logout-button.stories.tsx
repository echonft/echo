// noinspection JSUnusedGlobalSymbols

import { LogoutButton as Component } from '@echo/ui/components/auth/logout-button'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Auth/Logout Button',
  component: Component,
  args: {
    loading: false
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' }
    },
    onClick: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const LogoutButton: StoryObj<typeof Component> = {}
