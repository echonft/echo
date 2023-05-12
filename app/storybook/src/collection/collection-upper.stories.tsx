import { bannerUrl, collectionProfilePictureUrl } from '../constants'
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
      name={'sun flyers nft'}
      size={10000}
      profilePictureUrl={collectionProfilePictureUrl}
      discordUrl={'https://discord.gg/qdJTyTXT'}
      twitterUsername={'Sun_flyers'}
      websiteUrl={'https://echonft.xyz'}
      bannerUrl={bannerUrl}
      description={
        'A handcrafted collection of 10,000 characters developed by artist DirtyRobot. Each with their own identity to be discovered within the wider stories of RENGA. In its purest form, RENGA is the art of storytelling'
      }
    />
  )
}
