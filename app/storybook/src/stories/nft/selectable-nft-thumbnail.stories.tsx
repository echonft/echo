import { SelectableNftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import { getNftById } from '@mocks/model/nft'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail/Selectable',
  component: Component,
  argTypes: {
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

const nft = getNftById('QFjMRNChUAHNswkRADXh')
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft,
    linkDisabled: true
  }
}

export const Selected: Story = {
  args: {
    nft: assoc('selected', true, nft),
    linkDisabled: true
  }
}

export const Disabled: Story = {
  args: {
    nft: assoc('disabled', true, nft),
    linkDisabled: true
  }
}
