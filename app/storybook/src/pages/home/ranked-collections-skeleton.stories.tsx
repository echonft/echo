// noinspection JSUnusedGlobalSymbols

import { RankedCollectionsSkeleton as Component } from '@echo/ui/pages/home/collection/ranked/skeleton/ranked-collections-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Ranked Collections',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
