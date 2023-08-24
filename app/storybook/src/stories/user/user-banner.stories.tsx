import { getUserById } from '../../mocks/model/user'
import { BannerSkeleton, UserBanner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Banner ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = getUserById('6rECUMhevHfxABZ1VNOm')
export const Standard: Story = {
  render: () => <Component discordBanner={user.discordBanner} discordId={user.discordId} />
}

export const Default: Story = {
  render: () => <Component discordBanner={undefined} discordId={user.discordId} />
}

export const Skeleton: Story = {
  render: () => <BannerSkeleton />
}
