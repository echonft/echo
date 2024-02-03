/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockGuild } from '@echo/bot-mocks/discord/guild-mock'
import { randomSnowflake } from '@echo/bot-test/discord/snowflake'
import type { Nullable } from '@echo/utils/types/nullable'
import {
  type APIGuildTextChannel,
  type APITextChannel,
  ChannelType,
  Client,
  type Guild,
  type GuildBasedChannel,
  type GuildTextChannelType,
  TextChannel
} from 'discord.js'

export function getGuildTextChannelMockDataBase<Type extends GuildTextChannelType>(type: Type, guild: Guild) {
  const rawData: APIGuildTextChannel<Type> = {
    id: randomSnowflake().toString(),
    type,
    position: 0,
    default_auto_archive_duration: 60,
    rate_limit_per_user: 0,
    flags: undefined,
    guild_id: guild?.id,
    last_message_id: null,
    last_pin_timestamp: null,
    name: 'channel name',
    nsfw: false,
    parent_id: null,
    permission_overwrites: [],
    topic: 'channel topic'
  }
  return rawData
}

function setupMockedChannel<T extends GuildBasedChannel>(
  client: Client,
  guild: Nullable<Guild>,
  createMockData: (guild: Guild) => T
): T {
  if (!guild) {
    guild = mockGuild(client)
  }
  const channel = createMockData(guild)
  client.channels.cache.set(channel.id, channel)
  guild.channels.cache.set(channel.id, channel)
  return channel
}
export function mockTextChannel(client: Client, guild?: Guild, data: Partial<APITextChannel> = {}): TextChannel {
  const rawData: APITextChannel = {
    ...getGuildTextChannelMockDataBase(ChannelType.GuildText, guild ?? mockGuild(client)),
    ...data
  }
  return Reflect.construct(TextChannel, [guild, rawData, client]) as TextChannel
}

export function mockAndSetupChannel(client: Client, guild?: Guild, data: Partial<APITextChannel> = {}): TextChannel {
  return setupMockedChannel(client, guild, (guild) => {
    return mockTextChannel(client, guild, data)
  })
}
