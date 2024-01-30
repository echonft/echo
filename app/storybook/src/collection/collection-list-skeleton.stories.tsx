// noinspection JSUnusedGlobalSymbols

import { CollectionsPageSkeleton as Component } from '@echo/ui/pages/collection/list/skeleton/collections-page-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/List',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
