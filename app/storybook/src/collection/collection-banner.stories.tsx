import { mockNftCollection } from '@echo/model'
import { Banner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Banner',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component bannerUrl={new URL(mockNftCollection.openSea!.imageUrl!)} />
}

export const Default: Story = {
  render: () => <Component bannerUrl={undefined} />
}
