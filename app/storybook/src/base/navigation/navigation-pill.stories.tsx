// noinspection JSUnusedGlobalSymbols

import { NavigationPill as Component } from '@echo/ui/components/base/navigation/navigation-pill'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Navigation Pill',
  component: Component,
  argTypes: {
    selected: {
      defaultValue: false,
      control: { type: 'boolean' }
    }
  },
  parameters: {
    controls: {
      exclude: ['path']
    }
  }
}

export default metadata

export const NavigationPill: StoryObj<typeof Component> = {
  args: {
    name: 'Items',
    path: '#',
    selected: false
  }
}
