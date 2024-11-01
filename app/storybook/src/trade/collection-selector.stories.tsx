// noinspection JSUnusedGlobalSymbols

import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { CollectionSelector as Component } from '@echo/ui/components/trade/collection-selector/collection-selector'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Collection Selector',
  args: {
    collection: collectionMockSpiral
  },
  argTypes: {
    onAddQuantity: {
      table: {
        disable: true
      }
    }
  },
  component: Component,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ]
}

export default metadata
export const Default: StoryObj<typeof Component> = {}

export const NoCollection: StoryObj<typeof Component> = {
  args: {
    collection: null
  }
}
