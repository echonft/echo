import { TraitFilterGroup, TraitFilterPanel as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Panel',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const traitFilterGroups: TraitFilterGroup[] = [
  {
    type: 'Trait 1',
    traits: [
      { name: 'Trait Name A', count: 123 },
      { name: 'Trait Name B', count: 456 },
      { name: 'Trait Name C', count: 789 },
      { name: 'Trait Name D', count: 111 }
    ]
  },
  {
    type: 'Trait 2',
    traits: [
      { name: 'Trait Name A', count: 1111 },
      { name: 'Trait Name B', count: 2222 },
      { name: 'Trait Name C', count: 3333 },
      { name: 'Trait Name D', count: 4444 }
    ]
  },
  {
    type: 'Trait 3',
    traits: [
      { name: 'Trait Name A', count: 10 },
      { name: 'Trait Name B', count: 100 },
      { name: 'Trait Name C', count: 1000 }
    ]
  }
]
const initialSelections = new Map<string, string[]>()
initialSelections.set('Trait 1', ['Trait Name A', 'Trait Name C', 'Trait Name D'])
initialSelections.set('Trait 3', ['Trait Name C'])

export const Default: Story = {
  args: {
    traitFilterGroups
  }
}

export const SomeSelected: Story = {
  args: {
    traitFilterGroups,
    initialSelections
  }
}
