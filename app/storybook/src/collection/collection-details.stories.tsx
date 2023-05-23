import { collectionProfilePictureUrl } from '../constants'
import { mockNftCollection } from '@echo/model'
import { CollectionDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Details',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const CollectionDetails: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.openSea!.collectionName!}
      size={10000}
      profilePictureUrl={new URL(collectionProfilePictureUrl)}
      discordUrl={mockNftCollection.openSea!.discordUrl}
      twitterUsername={mockNftCollection.openSea!.twitterUsername}
      websiteUrl={mockNftCollection.openSea!.externalUrl}
    />
  )
}
