import { getHasNft } from '../api/get-has-nft'
import { NoGuildIdError } from '../errors/no-guild-id-error'
import { collectionListingsLink } from '../routing/collection-listings-link'
import { createListingLink } from '../routing/create-listing-link'
import { isNilOrEmpty, toPromise } from '@echo/utils'
import { CommandInteraction, Message, SlashCommandSubcommandBuilder } from 'discord.js'
import { andThen, applySpec, call, converge, head, ifElse, invoker, juxt, last, path, pipe, prop, useWith } from 'ramda'

/**
 * Create listing command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const createListingSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('create').setDescription('Create a listing')

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
              converge(call, [
                invoker(1, 'editReply'),
                applySpec({
                  content: useWith(createListingLink, [prop('guildId')])
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
