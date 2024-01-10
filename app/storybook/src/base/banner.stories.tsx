import { Banner as Component } from '@echo/ui/components/base/banner'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Banner',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    open: true,
    title: 'Title',
    subtitle: 'Subtitle'
  }
}

export const NoSubtitle: Story = {
  args: {
    open: true,
    title: 'Title with no subtitle'
  }
}

export const SubtitleAction: Story = {
  args: {
    title: 'Title',
    subtitle: 'Close banner'
  },
  render: (props) => {
    const [bannerOpen, setBannerOpen] = useState(true)
    return <Component {...props} onSubtitleClick={() => setBannerOpen(false)} open={bannerOpen} />
  }
}
