import { NftTraits } from '@echo/model'
import { TraitFilterPanel as Component, TraitFilterPanelSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Panel',
  component: Component,
  argTypes: {
    onSelectionUpdate: {
      control: false,
      action: 'selection updated'
    }
  },
  parameters: {
    controls: {
      exclude: ['traits', 'selection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const traits: NftTraits = {
  'Trait 1': [
    { value: 'Trait Name A', count: 123 },
    { value: 'Trait Name B', count: 456 },
    { value: 'Trait Name C', count: 789 },
    { value: 'Trait Name D', count: 111 }
  ],
  'Trait 2': [
    { value: 'Trait Name A', count: 1111 },
    { value: 'Trait Name B', count: 2222 },
    { value: 'Trait Name C', count: 3333 },
    { value: 'Trait Name D', count: 4444 }
  ],
  'Trait 3': [
    { value: 'Trait Name A', count: 10 },
    { value: 'Trait Name B', count: 100 },
    { value: 'Trait Name C', count: 1000 }
  ]
}

const selection: NftTraits = {
  'Trait 1': [
    { value: 'Trait Name A', count: 123 },
    { value: 'Trait Name C', count: 789 },
    { value: 'Trait Name D', count: 111 }
  ],
  'Trait 3': [{ value: 'Trait Name C', count: 1000 }]
}

export const Default: Story = {
  args: {
    traits
  }
}

export const SomeSelected: Story = {
  args: {
    traits,
    selection
  }
}

export const Skeleton: Story = {
  render: () => <TraitFilterPanelSkeleton />
}
