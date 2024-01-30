// noinspection JSUnusedGlobalSymbols

import { ExploreNavigationPill as Component } from '@echo/ui/components/base/navigation/explore-navigation-pill'
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
      exclude: ['name', 'path']
    }
  }
}

export default metadata

export const Explore: StoryObj<typeof Component> = {
  args: {
    name: 'Explore',
    path: '#',
    selected: false
  }
}
