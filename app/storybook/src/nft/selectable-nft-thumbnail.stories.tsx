import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { SelectableNftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail/Selectable',
  component: Component,
  argTypes: {
    hideOwner: {
      defaultValue: false,
      control: 'boolean'
    },
    onToggleSelection: {
      control: false,
      action: 'selection toggled'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft']
    }
  }
}

export default metadata

const nft = getNftMockById('QFjMRNChUAHNswkRADXh')
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft
  }
}

export const Selected: Story = {
  args: {
    nft: assoc('selected', true, nft)
  }
}

export const Disabled: Story = {
  args: {
    nft: assoc('disabled', true, nft)
  }
}
