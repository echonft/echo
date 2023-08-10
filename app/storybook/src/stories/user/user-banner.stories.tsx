import { users } from '@echo/model'
import { BannerSkeleton, UserBanner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/Banner ',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

const user = users['oE6yUEQBPn7PZ89yMjKn']!
// TODO when we have with a banner
// export const Standard: Story = {
//   render: () => (
//     <Component discordBanner={user.discordBanner} discordId={user.discordId} />
//   )
// }

export const Default: Story = {
  render: () => <Component discordBanner={undefined} discordId={user.discordId} />
}

export const Skeleton: Story = {
  render: () => <BannerSkeleton />
}
