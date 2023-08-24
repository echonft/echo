import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionProfile as Component, CollectionProfileSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Profile',
  component: Component
}

export default metadata

const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
type Story = StoryObj<typeof Component>

export const Default: Story = {
  render: () => (
    <Component
      collectionName={collection.name}
      size={10000}
      pictureUrl={collection.profilePictureUrl}
      discordUrl={collection.discordUrl}
      twitterUsername={collection.twitterUsername}
      websiteUrl={collection.websiteUrl}
    />
  )
}

export const Skeleton: Story = {
  render: () => <CollectionProfileSkeleton />
}
