// noinspection JSUnusedGlobalSymbols

import { search } from '@echo/storybook/mocks/search'
import { SearchBox, type SearchBoxProps } from '@echo/ui/components/base/search/search-box'
import type { Meta, StoryObj } from '@storybook/react'
import { type FunctionComponent } from 'react'

interface Props extends Pick<SearchBoxProps<string>, 'onSelect'> {
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
  args: {
    showCategories: true
  },

  render: ({ showCategories, onSelect }) => {
    return (
      <SearchBox
        resultsProvider={search}
        onSelect={onSelect}
        style={{ categories: { show: showCategories }, placeHolder: 'Search' }}
      />
    )
  }
}
