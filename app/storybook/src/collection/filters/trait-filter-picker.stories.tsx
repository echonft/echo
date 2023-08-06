import { FiltersPanel, TraitFilterGroup, TraitFilterPicker as Component, TraitFilterPickerManager } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Picker',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const traitFilterGroup: TraitFilterGroup = {
  trait: 'Trait',
  values: [
    { value: 'Trait Name A', count: 123 },
    { value: 'Trait Name B', count: 456 },
    { value: 'Trait Name C', count: 789 },
    { value: 'Trait Name D', count: 111 }
  ]
}

export const Default: Story = {
  render: () => (
    <FiltersPanel>
      <Component traitFilterGroup={traitFilterGroup} />
    </FiltersPanel>
  )
}

export const Collapsed: Story = {
  render: () => (
    <FiltersPanel>
      <Component traitFilterGroup={traitFilterGroup} collapsed />
    </FiltersPanel>
  )
}

export const AAndDSelected: Story = {
  render: () => (
    <FiltersPanel>
      <Component
        traitFilterGroup={traitFilterGroup}
        selection={[
          { value: 'Trait Name A', count: 123 },
          { value: 'Trait Name D', count: 111 }
        ]}
        collapsed
      />
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
