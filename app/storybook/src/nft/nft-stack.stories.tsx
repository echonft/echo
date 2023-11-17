import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { NftStack as Component } from '@echo/ui/components/nft/stack/nft-stack'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component,
  parameters: {
    controls: {
      exclude: 'stack'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const nfts = getAllNftMocks()
const { owner, collection, pictureUrl, tokenId } = head(nfts)
export const Stack: Story = {
  args: {
    stack: {
      owner,
      collection,
      pictureUrl,
      tokenId,
      nfts
    }
  }
}
