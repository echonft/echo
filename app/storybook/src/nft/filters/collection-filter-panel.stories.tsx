// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { getCollectionFiltersForNfts } from '@echo/ui/helpers/nft/get-collection-filters-for-nfts'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/Panel/By Collection',
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

export const ByCollection: StoryObj<typeof Component> = {
  args: {
    filters: getCollectionFiltersForNfts(getAllNftMocks())
  }
}
