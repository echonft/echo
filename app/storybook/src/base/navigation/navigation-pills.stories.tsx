// noinspection JSUnusedGlobalSymbols

import { NavigationPills as Component } from '@echo/ui/components/base/navigation/navigation-pills'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
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
        id: NAVIGATION_NFTS,
        path: '#'
      },
      {
        name: 'Listings',
        id: NAVIGATION_LISTINGS,
        path: '#'
      },
      {
        name: 'Swaps',
        id: NAVIGATION_SWAPS,
        path: '#'
      }
    ],
    activeItem: NAVIGATION_NFTS
  }
}
