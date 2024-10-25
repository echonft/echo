// noinspection JSUnusedGlobalSymbols

import { mapCollectionToSearchResult } from '@echo/firestore/mappers/collection/map-collection-to-search-result'
import { mapUserToSearchResult } from '@echo/firestore/mappers/user/map-user-to-search-result'
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
  onSelect: (selection: SearchResult<string>) => void
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
      defaultValue: false,
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
        return concat<SearchResult<string>, SearchResult<string>>(
          map(mapCollectionToSearchResult, collections),
          map(mapUserToSearchResult, users)
        )
      }
      return map(mapCollectionToSearchResult, collections)
    }, [showCategories])

    return (
      <Combobox onChange={onSelect}>
        <SearchResultsPanel results={results} style={{ categories: { show: showCategories } }} />
      </Combobox>
    )
  }
}

export const Empty: StoryObj<ComponentType> = {
  render: () => <SearchResultsPanel results={[]} />
}
