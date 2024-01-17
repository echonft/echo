import { Banner as Component } from '@echo/ui/components/base/banner'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Banner',
  component: Component,
  argTypes: {
    onClick: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    onClick: undefined
  }
}

export const NoSubtitle: Story = {
  args: {
    title: 'Title with no subtitle'
  }
}

export const SubtitleAction: Story = {
  args: {
    title: 'Title',
    subtitle: 'Close banner'
  }
}
