// noinspection JSUnusedGlobalSymbols

import { Error500Page as Component } from '@echo/ui/pages/error/error-500-page'
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
