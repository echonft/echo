// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { TraitFilterPanel as Component } from '@echo/ui/components/nft/filters/by-traits/trait-filter-panel'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Filters/By Traits/Panel',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
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
