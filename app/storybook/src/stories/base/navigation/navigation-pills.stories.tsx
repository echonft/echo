import { NavigationPills as Component } from '@echo/ui/components/layout/navigation/navigation-pills'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Navigation Pills',
  component: Component,
  parameters: {
    controls: {
      exclude: ['items', 'selectedItemId']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const NavigationPills: Story = {
  args: {
    items: [
      {
        name: 'Items',
        id: 'items',
        path: '#'
      },
      {
        name: 'Listings',
        id: 'listings',
        path: '#'
      },
      {
        name: 'Swaps',
        id: 'swaps',
        path: '#'
      }
    ],
    activeItem: 'items'
  }
}
