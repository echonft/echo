import { CollectionFilterPanel as Component } from '@echo/ui/components/nft/filters/by-collection/collection-filter-panel'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Panel',
  component: Component,
  argTypes: {
    onToggleSelection: {
      control: false,
      action: 'selection toggle'
    }
  },
  parameters: {
    controls: {
      exclude: ['filters']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    filters: [
      {
        name: 'pxMythics',
        id: 'whatever',
        count: 1
      },
      {
        name: 'This collection name is waaaayyyyyyyyy too long',
        id: 'whatever',
        count: 10
      },
      {
        name: 'Sun Flyers',
        id: 'whatever',
        count: 100,
        selected: true
      }
    ]
  }
}
