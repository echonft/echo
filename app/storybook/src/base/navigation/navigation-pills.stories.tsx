// noinspection JSUnusedGlobalSymbols

import { NavigationPills as Component } from '@echo/ui/components/base/navigation/navigation-pills'
import { NAVIGATION_LISTINGS, NAVIGATION_NFTS, NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { type Meta, type StoryObj } from '@storybook/react'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  selection: 'Items' | 'Listings' | 'Swaps'
}>
const metadata: Meta<ComponentType> = {
  title: 'Base/Navigation Pills',
  args: {
    selection: 'Items'
  },
  argTypes: {
    selection: {
      defaultValue: 'Items',
      options: ['Items', 'Listings', 'Swaps'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ selection }) => {
    function getActiveItem() {
      switch (selection) {
        case 'Items':
          return NAVIGATION_NFTS
        case 'Listings':
          return NAVIGATION_LISTINGS
        case 'Swaps':
          return NAVIGATION_SWAPS
      }
    }
    return (
      <Component
        items={[
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
        ]}
        activeItem={getActiveItem()}
      />
    )
  }
}
