// noinspection JSUnusedGlobalSymbols

import { CollectionThumbnailSkeleton as Component } from '@echo/ui/components/collection/thumbnail/skeleton/collection-thumbnail-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Thumbnail',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
