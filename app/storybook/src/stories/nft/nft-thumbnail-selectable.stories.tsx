import { getNftById } from '../../mocks/model/nft'
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

const nft = getNftById('QFjMRNChUAHNswkRADXh')
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft
  }
}

// export const Flagged: Story = {
//   args: {
//     nft: mockNft,
//     flagged: true
//   }
// }

export const OwnerHidden: Story = {
  args: {
    nft,
    hideOwner: true
  }
}

export const Selected: Story = {
  args: {
    nft,
    selected: true
  }
}

export const Managed: Story = {
  render: () => (
    <SelectionManager>
      <Component nft={nft} />
    </SelectionManager>
  )
}
