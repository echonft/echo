import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  parameters: {
    controls: {
      exclude: 'nfts'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Stack: Story = {
  args: {
    nfts: getAllNftMocks()
  }
}
