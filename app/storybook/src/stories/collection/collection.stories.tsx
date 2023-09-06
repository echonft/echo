import { getAllNfts } from '../../mocks/model/nft'
import { getCollectionById } from '../../mocks/model/nft-collection'
import { Collection as Component } from '@echo/ui'
import { getTraitsForNfts } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection',
  component: Component,
  argTypes: {
    onMakeOfferForNft: {
      control: false,
      action: 'make offer for an NFT clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['collection', 'nfts', 'traits', 'onMakeOfferForNft']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
const nfts = getAllNfts()
const traits = getTraitsForNfts(nfts)

export const Default: Story = {
  args: {
    collection,
    nfts,
    traits
  }
}
