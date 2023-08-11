import { CollectionFilterSelector as Component, FiltersPanel, SelectionManager } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Filters/Collection Filter Selector',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <FiltersPanel title={'Collections'}>
      <Component
        filter={{
          name: 'pxMythics',
          id: 'whatever',
          count: 1
        }}
      />
    </FiltersPanel>
  )
}

export const Overflow: Story = {
  render: () => (
    <FiltersPanel title={'Collections'}>
      <Component
        filter={{
          name: 'This collection name is waaaayyyyyyyyy too long',
          id: 'whatever',
          count: 10
        }}
      />
    </FiltersPanel>
  )
}

export const Selected: Story = {
  render: () => (
    <FiltersPanel title={'Collections'}>
      <Component
        filter={{
          name: 'Sun Flyers',
          id: 'whatever',
          count: 100
        }}
        selected
      />
    </FiltersPanel>
  )
}

export const Managed: Story = {
  render: () => (
    <FiltersPanel title={'Collections'}>
      <SelectionManager>
        <Component
          filter={{
            name: 'Spiral Frequencies',
            id: 'whatever',
            count: 90
          }}
        />
      </SelectionManager>
    </FiltersPanel>
  )
}
