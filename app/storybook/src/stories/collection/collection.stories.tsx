import { Collection as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection/Fetched',
  component: Component,
  argTypes: {
    onCollectionError: {
      control: false,
      action: 'collection error'
    },
    onNftsError: {
      control: false,
      action: 'NFTs error'
    },
    onMakeOfferForNft: {
      control: false,
      action: 'make offer for an NFT clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['slug']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
export const Fetched: Story = {
  args: {
    slug: 'pxmythics-genesis'
  }
}
