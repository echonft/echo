import { Banner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Banner',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const CollectionBanner: Story = {
  render: () => (
    <Component src={'https://i.seadn.io/gcs/files/71968315427ae68b7cfdfe43f173e10b.png?auto=format&w=3840'} />
  )
}
