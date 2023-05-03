import { CollectionLinks as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Links',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const CollectionLinks: Story = {
  args: {
    websiteUrl: 'https://echonft.xyz',
    discordUrl: 'https://discord.gg/qdJTyTXT',
    twitterUsername: 'Sun_flyers'
  },
  render: ({ websiteUrl, discordUrl, twitterUsername }) => (
    <Component websiteUrl={websiteUrl} discordUrl={discordUrl} twitterUsername={twitterUsername} />
  )
}
