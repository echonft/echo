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
      description={'10K NFTs'}
      profilePictureUrl={
        'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-pfp.jpg?alt=media'
      }
      discordUrl={'https://discord.gg/qdJTyTXT'}
      twitterUsername={'Sun_flyers'}
      websiteUrl={'https://echonft.xyz'}
    />
  )
}
