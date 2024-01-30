// noinspection JSUnusedGlobalSymbols

import { TraitFilterButtonSkeleton as Component } from '@echo/ui/components/nft/filters/by-traits/skeleton/trait-filter-button-skeleton'
import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Filters/Trait Filter Button',
  component: Component,
  decorators: [
    (Story) => (
      <NftFiltersPanelLayout title={'Collections'}>
        <Story />
      </NftFiltersPanelLayout>
    )
  ]
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
