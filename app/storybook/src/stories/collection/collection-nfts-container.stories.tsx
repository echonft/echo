import { getAllNfts } from '../../mocks/model/nft'
import { CollectionNftsContainer as Component } from '@echo/ui'
import { Story } from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/NFTs Container',
  component: Component,
  argTypes: {
    onToggleSelection: {
      control: false,
      action: 'selection toggled'
    },
    onMakeOfferForNft: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts', 'selection', 'isLoading']
    }
  }
}

export default metadata

const nfts = getAllNfts()
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nfts
  }
}

export const Loading: Story = {
  args: {
    nfts,
    isLoading: true
  }
}
