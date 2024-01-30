// noinspection JSUnusedGlobalSymbols

import { NftStackSkeleton as Component } from '@echo/ui/components/nft/stack/skeleton/nft-stack-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Stack',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
