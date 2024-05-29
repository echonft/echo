// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/By Collection/Panel',
  component: Component,
  argTypes: {
    onSelect: {
      table: {
        disable: true
      }
    },
    onUnselect: {
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

export const Panel: StoryObj<typeof Component> = {
  args: {
    nfts: getAllNftMocks()
  }
}
