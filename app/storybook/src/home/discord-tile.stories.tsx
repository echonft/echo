// noinspection JSUnusedGlobalSymbols

import { DiscordTile as Component } from '@echo/ui/components/home/discord/discord-tile'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Home/Discord Tile',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>
export const DiscordTile: Story = {}
