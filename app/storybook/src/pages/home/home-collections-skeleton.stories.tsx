// noinspection JSUnusedGlobalSymbols

import { HomeCollectionsSkeleton as Component } from '@echo/ui/pages/home/collection/skeleton/home-collections-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Collections',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
