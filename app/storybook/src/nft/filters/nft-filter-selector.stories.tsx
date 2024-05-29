// noinspection JSUnusedGlobalSymbols

import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { NftFilter as Component } from '@echo/ui/components/nft/filters/nft-filter'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/Selector',
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
      exclude: ['filter', 'selected']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    filter: { id: 'id', label: 'Trait Value', count: 1754 }
  }
}

export const Overflow: StoryObj<typeof Component> = {
  args: {
    filter: { id: 'id', label: 'This Trait value is waaaayyyyyyyyy too long', count: 1754 }
  }
}

export const Selected: StoryObj<typeof Component> = {
  args: {
    filter: {
      id: 'id',
      label: 'Trait Name',
      count: 1754
    },
    selected: true
  }
}
