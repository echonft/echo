// noinspection JSUnusedGlobalSymbols

import { CollectionListSkeleton as Component } from '@echo/ui/components/collection/row/skeleton/collection-list-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/List',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
