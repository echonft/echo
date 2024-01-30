// noinspection JSUnusedGlobalSymbols

import { CollectionFilterSelector as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-selector'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Selector',
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
    filter: {
      name: 'pxMythics',
      id: 'whatever',
      count: 1
    }
  }
}

export const Overflow: StoryObj<typeof Component> = {
  args: {
    filter: {
      name: 'This collection name is waaaayyyyyyyyy too long',
      id: 'whatever',
      count: 10
    }
  }
}

export const Selected: StoryObj<typeof Component> = {
  args: {
    filter: {
      name: 'Sun Flyers',
      id: 'whatever',
      count: 100,
      selected: true
    }
  }
}
