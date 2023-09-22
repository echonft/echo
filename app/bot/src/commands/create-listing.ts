import { getHasNft } from '@echo/bot/api/get-has-nft'
import { NoGuildIdError } from '@echo/bot/errors/no-guild-id-error'
import { collectionListingsLink } from '@echo/bot/routing/collection-listings-link'
import { links } from '@echo/ui/constants/links'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { toPromise } from '@echo/utils/fp/to-promise'
import { CommandInteraction, Message, SlashCommandSubcommandBuilder } from 'discord.js'
import {
  always,
  andThen,
  applySpec,
  call,
  converge,
  head,
  ifElse,
  invoker,
  juxt,
  last,
  path,
  pipe,
  prop,
  useWith
} from 'ramda'

/**
 * Create listing command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export function createListingSubcommand(subCommand: SlashCommandSubcommandBuilder) {
  return subCommand.setName('create').setDescription('Create a listing')
}

// TODO Must have a cleaner way to use ramda here
export const executeCreateListing: (interaction: CommandInteraction) => Promise<Message<boolean>> = ifElse(
  pipe(prop('guildId'), isNilOrEmpty),
  () => {
    throw new NoGuildIdError()
  },
  pipe(
    (interaction) => interaction.deferReply({ ephemeral: true }).then(() => interaction),
    andThen(
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        juxt([toPromise, converge(getHasNft, [path(['user', 'id']), prop('guildId')])]),
        (promises) => Promise.all(promises),
        andThen(
          ifElse(
            last,
            pipe(
              head,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              converge(call, [
                invoker(1, 'editReply'),
                always({
                  content: links.profile.items
                })
              ])
            ),
            pipe(
              head,
              converge(call, [
                invoker(1, 'editReply'),
                applySpec({
                  content: useWith(collectionListingsLink, [prop('guildId')])
                })
              ])
            )
          )
        )
      )
    )
  )
)
