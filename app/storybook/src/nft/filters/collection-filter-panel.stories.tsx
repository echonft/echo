// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/Panel/By Collection',
  component: Component,
  argTypes: {
    onNftsFiltered: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts']
    }
  }
}

export default metadata

export const ByCollection: StoryObj<typeof Component> = {
  args: {
    nfts: getAllNftMocks()
  }
}
