import { getAllNfts } from '../../../mocks/model/nft'
import { NftsByCollectionDisclosureManager as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/NFT/NFTs By Collection Disclosure',
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

const nfts = getAllNfts()
export const NFTsByCollectionDisclosure: Story = {
  args: {
    nfts
  }
}
