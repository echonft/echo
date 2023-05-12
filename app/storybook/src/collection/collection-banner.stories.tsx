import { bannerUrl } from '../constants'
import { Banner as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Collection/Collection Banner',
  component: Component
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  render: () => <Component src={bannerUrl} />
}

export const Default: Story = {
  render: () => <Component src={undefined} />
}
