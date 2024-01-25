// noinspection JSUnusedGlobalSymbols

import { Error500 as Component } from '@echo/ui/components/base/error/error-500'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Error/Server Error',
  component: Component,
  argTypes: {
    onReset: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const ServerError: StoryObj<typeof Component> = {}
