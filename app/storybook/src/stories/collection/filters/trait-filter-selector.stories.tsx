import { SelectionManager } from '@echo/ui/src/components/base/manager/selection-manager'
import { FiltersPanel as Component } from '@echo/ui/src/components/layout/filters-panel'
import { TraitFilterSelector } from '@echo/ui/src/components/nft/filters/by-traits/trait-filter-selector'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Selector',
  component: Component,
  parameters: {
    controls: {
      exclude: ['className']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    children: (
      <TraitFilterSelector
        value={{
          value: 'Trait Name',
          count: 1754
        }}
      />
    )
  }
}

export const Overflow: Story = {
  args: {
    children: (
      <TraitFilterSelector
        value={{
          value: 'This Trait Name is waaaayyyyyyyyy too long',
          count: 1754
        }}
      />
    )
  }
}

export const Selected: Story = {
  args: {
    children: (
      <TraitFilterSelector
        value={{
          value: 'Trait Name',
          count: 1754
        }}
        selected
      />
    )
  }
}

export const Managed: Story = {
  args: {
    children: (
      <SelectionManager>
        <TraitFilterSelector
          value={{
            value: 'Trait Name',
            count: 1754
          }}
        />
      </SelectionManager>
    )
  }
}
