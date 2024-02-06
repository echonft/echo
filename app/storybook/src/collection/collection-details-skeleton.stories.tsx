// noinspection JSUnusedGlobalSymbols

import { CollectionDetailsSkeleton as Component } from '@echo/ui/components/collection/details/skeleton/collection-details-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Details',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
