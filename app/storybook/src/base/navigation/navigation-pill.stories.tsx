// noinspection JSUnusedGlobalSymbols

import { NavigationPill as Component } from '@echo/ui/components/navigation/navigation-pill'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Navigation Pill',
  component: Component,
  parameters: {
    controls: {
      exclude: ['selected', 'path']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    name: 'Items',
    path: '#'
  }
}

export const Selected: Story = {
  args: {
    name: 'Items',
    path: '#',
    selected: true
  }
}
