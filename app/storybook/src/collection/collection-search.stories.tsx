// noinspection JSUnusedGlobalSymbols

import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { CollectionSearchBoxManager as Component } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Search',
  component: Component,
  args: {
    disabled: false,
    options: getAllCollectionMocks()
  },
  argTypes: {
    disabled: {
      defaultValue: false,
      control: 'boolean'
    },
    onSelectionChange: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ height: 'max-content', width: '48rem' }}>
        <Story />
      </div>
    )
  ],
  parameters: {
    controls: {
      exclude: ['options', 'name']
    }
  }
}

export default metadata

export const Search: StoryObj<typeof Component> = {}
