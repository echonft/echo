import { Banner as Component, BannerSkeleton } from '@echo/ui'
import { nftCollections } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component bannerUrl={nftCollections['Rc8pLQXxgyQGIRL0fr13']!.bannerUrl} />
}

export const Default: Story = {
  render: () => <Component bannerUrl={undefined} />
}

export const Skeleton: Story = {
  render: () => <BannerSkeleton />
}
