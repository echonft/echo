import { getAllNfts } from '../../../mocks/model/nft'
import { UserNftsAndFiltersContainer as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/NFT/NFTs and Filters Container',
  component: Component,
  argTypes: {
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts', 'onMakeOffer']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nfts: getAllNfts()
  }
}
