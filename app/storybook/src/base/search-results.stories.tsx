// noinspection JSUnusedGlobalSymbols

import { collectionToSearchResult } from '@echo/model/mappers/collection/collection-to-search-result'
import { userToSearchResult } from '@echo/model/mappers/user/user-to-search-result'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchResultsPanel } from '@echo/ui/components/base/search/search-results-panel'
import { Combobox } from '@headlessui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { concat, map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  showCategories: boolean
  onSelect: (selection: SearchResult) => void
}>

const metadata: Meta<ComponentType> = {
  title: 'Base/Search/Results',
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    )
  ]
}
export default metadata
export const Default: StoryObj<ComponentType> = {
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
  render: ({ showCategories, onSelect }) => {
    const collections = [collectionMockPx, collectionMockSpiral]
    const users = [userMockCrew, userMockJohnny]
    const results = useMemo(() => {
      if (showCategories) {
        return concat<SearchResult, SearchResult>(
          map(userToSearchResult, users),
          map(collectionToSearchResult, collections)
        )
      }
      return map(collectionToSearchResult, collections)
    }, [showCategories])

    return (
      <Combobox onChange={onSelect}>
        <SearchResultsPanel results={results} options={{ categories: { show: showCategories } }} />
      </Combobox>
    )
  }
}

export const Empty: StoryObj<ComponentType> = {
  render: () => <SearchResultsPanel results={[]} />
}
