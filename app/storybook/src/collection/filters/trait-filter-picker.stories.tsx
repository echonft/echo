import { FiltersPanel, TraitFilterGroup, TraitFilterPicker as Component, TraitFilterPickerManager } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Filters/Trait Filter Picker',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

const traitFilterGroup: TraitFilterGroup = {
  type: 'Trait',
  traits: [
    { name: 'Trait Name A', count: 123 },
    { name: 'Trait Name B', count: 456 },
    { name: 'Trait Name C', count: 789 },
    { name: 'Trait Name D', count: 111 }
  ]
}

export const Default: Story = {
  render: () => (
    <FiltersPanel>
      <Component traitFilterGroup={traitFilterGroup} collapsed />
    </FiltersPanel>
  )
}

export const AAndDSelected: Story = {
  render: () => (
    <FiltersPanel>
      <Component traitFilterGroup={traitFilterGroup} selection={['Trait Name A', 'Trait Name D']} collapsed />
    </FiltersPanel>
  )
}

export const Managed: Story = {
  render: () => (
    <FiltersPanel>
      <TraitFilterPickerManager traitFilterGroup={traitFilterGroup} />
    </FiltersPanel>
  )
}
