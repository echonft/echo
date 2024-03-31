import { mapCollectionToSearchResult } from '@echo/firestore/mappers/map-collection-to-search-result'
import { mapUserToSearchResult } from '@echo/firestore/mappers/map-user-to-search-result'
import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import type { SearchResult } from '@echo/model/types/search-result'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { SearchResults, type SearchResultsProps } from '@echo/ui/components/base/search/search-results'
import type { Meta, StoryObj } from '@storybook/react'
import { concat, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<
  Pick<SearchResultsProps<string>, 'onSelect'> & {
    showCategories: boolean
  }
>

const metadata: Meta<ComponentType> = {
  title: 'Base/Search/Results',
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
export const Results: StoryObj<ComponentType> = {
  render: ({ showCategories, onSelect }) => {
    const results = useMemo(() => {
      if (showCategories) {
        return concat<SearchResult<string>, SearchResult<string>>(
          pipe(getAllCollectionMocks, map(mapCollectionToSearchResult))(),
          pipe(getAllUserDocumentDataMocks, map(mapUserToSearchResult))()
        )
      }
      return pipe(getAllCollectionMocks, map(mapCollectionToSearchResult))()
    }, [showCategories])

    return <SearchResults results={results} style={{ categories: { show: showCategories } }} onSelect={onSelect} />
  }
}
