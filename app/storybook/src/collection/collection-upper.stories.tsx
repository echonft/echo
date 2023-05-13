import { collectionProfilePictureUrl } from '../constants'
import { mockNftCollection } from '@echo/model'
import { CollectionUpper as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Upper',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const CollectionUpper: Story = {
  render: () => (
    <Component
      collectionName={mockNftCollection.openSea!.collectionName!}
      size={10000}
      profilePictureUrl={new URL(collectionProfilePictureUrl)}
      discordUrl={mockNftCollection.openSea!.discordUrl}
      twitterUsername={mockNftCollection.openSea!.twitterUsername}
      websiteUrl={mockNftCollection.openSea!.externalUrl}
      bannerUrl={new URL(mockNftCollection.openSea!.imageUrl!)}
      description={
        'A handcrafted collection of 10,000 characters developed by artist DirtyRobot. Each with their own identity to be discovered within the wider stories of RENGA. In its purest form, RENGA is the art of storytelling'
      }
    />
  )
}
