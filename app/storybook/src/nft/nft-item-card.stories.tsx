import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftItemCard as Component } from '@echo/ui/components/nft/card/nft-item-card'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Item Card/Card',
  component: Component,
  argTypes: {
    expired: {
      defaultValue: false,
      control: 'boolean'
    },
    hideOwner: {
      defaultValue: false,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: 'nft'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft: getNftMock(),
    status: 'OPEN',
    hideOwner: false,
    expired: false
  }
}
