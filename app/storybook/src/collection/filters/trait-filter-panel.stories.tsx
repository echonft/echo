// noinspection JSUnusedGlobalSymbols

import { TraitFilterPanel as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Panel',
  component: Component,
  argTypes: {
    onToggleSelection: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['filters']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    filters: [
      { trait: 'Trait', value: 'Trait Value', count: 1754 },
      { trait: 'Trait', value: 'Another Trait Value', count: 9 },
      { trait: 'Another Trait', value: 'Trait Value', count: 10 },
      { trait: 'Another Trait', value: 'Selected Trait Value', count: 2, selected: true }
    ]
  }
}
