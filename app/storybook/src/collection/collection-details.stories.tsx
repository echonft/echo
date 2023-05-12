import { collectionProfilePictureUrl } from '../constants'
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
      name={'sun flyers nft'}
      size={10000}
      profilePictureUrl={collectionProfilePictureUrl}
      discordUrl={'https://discord.gg/qdJTyTXT'}
      twitterUsername={'Sun_flyers'}
      websiteUrl={'https://echonft.xyz'}
    />
  )
}
