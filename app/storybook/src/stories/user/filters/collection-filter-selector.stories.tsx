import { SelectionManager } from '@echo/ui/src/components/base/manager/selection-manager'
import { FiltersPanel as Component } from '@echo/ui/src/components/layout/filters-panel'
import { CollectionFilterSelector } from '@echo/ui/src/components/nft/filters/by-collection/collection-filter-selector'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Selector',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    children: (
      <Component title={'Collections'}>
        <CollectionFilterSelector
          filter={{
            name: 'pxMythics',
            id: 'whatever',
            count: 1
          }}
        />
      </Component>
    )
  }
}

export const Overflow: Story = {
  args: {
    children: (
      <Component title={'Collections'}>
        <CollectionFilterSelector
          filter={{
            name: 'This collection name is waaaayyyyyyyyy too long',
            id: 'whatever',
            count: 10
          }}
        />
      </Component>
    )
  }
}

export const Selected: Story = {
  args: {
    children: (
      <Component title={'Collections'}>
        <CollectionFilterSelector
          filter={{
            name: 'Sun Flyers',
            id: 'whatever',
            count: 100
          }}
          selected
        />
      </Component>
    )
  }
}

export const Managed: Story = {
  args: {
    children: (
      <Component title={'Collections'}>
        <SelectionManager>
          <CollectionFilterSelector
            filter={{
              name: 'Spiral Frequencies',
              id: 'whatever',
              count: 90
            }}
          />
        </SelectionManager>
      </Component>
    )
  }
}
