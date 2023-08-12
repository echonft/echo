import { UserNftsContainer as Component } from '@echo/ui'
import { nfts } from '@echo/ui-model'
import { Story } from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/NFTs Container',
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

const mockNft = nfts['QFjMRNChUAHNswkRADXh']!
const mockedNfts = [
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft,
  mockNft
]
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nfts: mockedNfts
  }
}

export const Loading: Story = {
  args: {
    nfts: mockedNfts,
    isLoading: true
  }
}
