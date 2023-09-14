import { Banner as Component } from '@echo/ui/components/shared/banner'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Standard: Story = {
  args: {
    bannerUrl: getCollectionById('Rc8pLQXxgyQGIRL0fr13').bannerUrl
  }
}

export const Default: Story = {
  args: {
    bannerUrl: undefined
  }
}
