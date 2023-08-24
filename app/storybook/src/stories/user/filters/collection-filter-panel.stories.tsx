import { CollectionFilterPanel as Component, CollectionFilterPanelSkeleton } from '@echo/ui'
import { CollectionFilter } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Panel',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
      control: false,
      action: 'selection updated'
    }
  },
  parameters: {
    controls: {
      exclude: ['filters', 'selection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const filters: CollectionFilter[] = [
  { id: 'pxMythics', name: 'pxMythics', count: 5 },
  { id: 'Spiral Frequencies', name: 'Spiral Frequencies', count: 2 },
  { id: 'Sun Flyers', name: 'Sun Flyers', count: 999 }
]

const selection: CollectionFilter[] = [{ id: 'Sun Flyers', name: 'Sun Flyers', count: 999 }]

export const Default: Story = {
  args: {
    filters
  }
}

export const SomeSelected: Story = {
  args: {
    filters,
    selection
  }
}

export const Skeleton: Story = {
  render: () => <CollectionFilterPanelSkeleton />
}
