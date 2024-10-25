// noinspection JSUnusedGlobalSymbols

import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { type Collection } from '@echo/model/types/collection'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { Background } from '@echo/ui/constants/background'
import { CollectionsPage as Component } from '@echo/ui/pages/collections/collections-page'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collections',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={Background.Collections} excludeProviders={true}>
        <SectionLayout>
          <Story />
        </SectionLayout>
      </PageLayout>
    )
  ],
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[Collection[]], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      concat(collectionMocks),
      concat(collectionMocks),
      concat(collectionMocks),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(collectionMocks)
  }
}

export const Loading: StoryObj<typeof Component> = {
  args: {},
  render: () => <CollectionsPageSkeleton />
}
