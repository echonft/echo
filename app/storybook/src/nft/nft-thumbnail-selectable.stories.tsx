import { nfts } from '@echo/model'
import { NftThumbnailSelectable as Component, SelectionManager } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail/Selectable',
  component: Component,
  argTypes: {
    onToggleSelection: {
      control: false,
      action: 'selection toggled'
    },
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft']
    }
  }
}

export default metadata

const mockNft = nfts['QFjMRNChUAHNswkRADXh']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft: mockNft
  }
}

// export const Flagged: Story = {
//   args: {
//     nft: mockNft,
//     flagged: true
//   }
// }

export const Selected: Story = {
  args: {
    nft: mockNft,
    selected: true
  }
}

export const Managed: Story = {
  render: () => (
    <SelectionManager>
      <Component nft={mockNft} />
    </SelectionManager>
  )
}
