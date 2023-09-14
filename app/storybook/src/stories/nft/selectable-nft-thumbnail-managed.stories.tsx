import { SelectionManager as Component } from '@echo/ui/components/base/manager/selection-manager'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import { getNftById } from '@mocks/model/nft'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail/Selectable',
  component: Component,
  parameters: {
    controls: {
      exclude: ['initialSelection', 'children']
    }
  }
}

export default metadata

const nft = getNftById('QFjMRNChUAHNswkRADXh')
type Story = StoryObj<typeof Component>

export const Managed: Story = {
  args: {
    children: <SelectableNftThumbnail nft={nft} linkDisabled={true} />
  }
}
