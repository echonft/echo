// noinspection JSUnusedGlobalSymbols

import { search } from '@echo/storybook/mocks/search'
import { SearchBoxManager, type SearchBoxManagerProps } from '@echo/ui/components/base/search/search-box-manager'
import type { Meta, StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SearchBoxManagerProps<string>, 'onSelect'> {
  showCategories: boolean
}
type ComponentType = FunctionComponent<Props>

const metadata: Meta<ComponentType> = {
  title: 'Base/Search/Box',
  args: {
    showCategories: false
  },
  argTypes: {
    showCategories: {
      defaultValue: false,
      control: 'boolean'
    },
    onSelect: {
      table: {
        disable: true
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    )
  ]
}
export default metadata
export const Box: StoryObj<ComponentType> = {
  render: ({ showCategories, onSelect }) => {
    return (
      <SearchBoxManager
        resultsProvider={search}
        onSelect={onSelect}
        style={{ categories: { show: showCategories }, placeHolder: 'Search' }}
      />
    )
  }
}
