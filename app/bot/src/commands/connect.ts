import { NoGuildIdError } from '@echo/bot/errors/no-guild-id-error'
import { loginLink } from '@echo/bot/routing/login-link'
import { findCollectionByDiscordGuildDiscordId } from '@echo/firestore/crud/collection-discord-guild/find-collection-by-discord-guild-discord-id'
import { type Collection } from '@echo/model/types/collection'
import { andThenOtherwise } from '@echo/utils/fp/and-then-otherwise'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { CommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js'
import { andThen, ifElse, isNil, pipe, prop } from 'ramda'

/**
 * Connect command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export function connectSubcommand(subCommand: SlashCommandSubcommandBuilder) {
  return subCommand.setName('connect').setDescription('Connect to the bot via Discord and Wallet')
}

export function executeConnect(interaction: CommandInteraction) {
  return ifElse(
    pipe(prop('guildId'), isNilOrEmpty<string>),
    () => {
      throw new NoGuildIdError()
    },
    pipe(
      (interaction: CommandInteraction) => interaction.deferReply({ ephemeral: true }).then(() => interaction),
      andThen(
        pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          prop('guildId'),
          // TODO this is not gonna work for collections in the Echo server, so we need to change that
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          findCollectionByDiscordGuildDiscordId,
          andThenOtherwise(
            ifElse(
              isNil,
              () => interaction.editReply({ content: new NoGuildIdError().message }),
              (collection: Collection) => {
                return interaction.editReply({
                  content: loginLink(collection.slug)
                })
              }
            ),
            () => interaction.editReply({ content: new NoGuildIdError().message })
          )
        )
      )
    )
  )(interaction)
}
