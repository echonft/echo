// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { SelectableNftsWithFilters as Component } from '@echo/ui/components/nft/selection/selectable-nfts-with-filters'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Page/Profile/Nfts',
  component: Component,
  args: {
    nfts: getAllNftMocks()
  },
  argTypes: {
    onSelectionAction: {
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

export const Nfts: StoryObj<typeof Component> = {}
