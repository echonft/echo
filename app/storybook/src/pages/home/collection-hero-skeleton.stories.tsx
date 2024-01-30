// noinspection JSUnusedGlobalSymbols

import { HomeHeroSkeleton as Component } from '@echo/ui/pages/home/hero/skeleton/home-hero-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Hero',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
