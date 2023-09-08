import { getAllNfts } from '../../../mocks/model/nft'
import { UserNftsContainer as Component } from '@echo/ui'
import { Story } from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/NFT/NFTs Container',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
      control: false,
      action: 'selection updated'
    }
  },
  parameters: {
    controls: {
      exclude: ['nfts', 'initialSelection', 'onSelectionUpdate']
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
