// noinspection JSUnusedGlobalSymbols

import { Banner as Component } from '@echo/ui/components/base/banner/banner'
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

export const Default: StoryObj<typeof Component> = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    onClick: undefined
  }
}

export const NoSubtitle: StoryObj<typeof Component> = {
  args: {
    title: 'Title with no subtitle'
  },
  parameters: {
    controls: {
      exclude: ['subtitle']
    }
  }
}

export const SubtitleAction: StoryObj<typeof Component> = {
  args: {
    title: 'Title',
    subtitle: 'Close banner'
  }
}
