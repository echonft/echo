// noinspection JSUnusedGlobalSymbols

import { TraitFilterSelector as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-selector'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Selector',
  component: Component,
  argTypes: {
    onToggleSelection: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    (Story) => (
      <NftFiltersPanelLayout title={'Collections'}>
        <Story />
      </NftFiltersPanelLayout>
    )
  ],
  parameters: {
    controls: {
      exclude: ['filter']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    filter: { trait: 'Trait', value: 'Trait Value', count: 1754 }
  }
}

export const Overflow: StoryObj<typeof Component> = {
  args: {
    filter: { trait: 'Trait', value: 'This Trait value is waaaayyyyyyyyy too long', count: 1754 }
  }
}

export const Selected: StoryObj<typeof Component> = {
  args: {
    filter: {
      trait: 'Trait',
      value: 'Trait Name',
      count: 1754,
      selected: true
    }
  }
}
