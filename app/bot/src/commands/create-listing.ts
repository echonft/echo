import { getHasNft } from '../api/get-has-nft'
import { NoGuildIdError } from '../errors/no-guild-id-error'
import { createListingLink, listingsLink } from '@echo/discord'
import { castAs, converge, isNilOrEmpty, toPromise } from '@echo/utils'
import { CommandInteraction, InteractionResponse, SlashCommandSubcommandBuilder } from 'discord.js'
import { andThen, applySpec, call, head, ifElse, invoker, juxt, last, path, pipe, prop, T, useWith } from 'ramda'

/**
 * Create listing command
 * @param subCommand The builder
 * @return SlashCommandSubcommandBuilder
 */
export const createListingSubcommand = (subCommand: SlashCommandSubcommandBuilder) =>
  subCommand.setName('create').setDescription('Create a listing')

// TODO Must have a cleaner way to use ramda here
export const executeCreateListing: (interaction: CommandInteraction) => Promise<InteractionResponse> = ifElse<
  [CommandInteraction],
  Promise<InteractionResponse>,
  Promise<InteractionResponse>
>(
  pipe(prop('guildId'), isNilOrEmpty),
  (interaction: CommandInteraction) => new NoGuildIdError().reply(interaction),
  pipe<
    [CommandInteraction],
    [Promise<CommandInteraction>, Promise<boolean>],
    Promise<[CommandInteraction, boolean]>,
    Promise<InteractionResponse>
  >(
    juxt([
      toPromise,
      converge(getHasNft, [
        pipe<[CommandInteraction], string | undefined, string>(path(['user', 'id']), castAs),
        prop('guildId')
      ])
    ]),
    (promises) => Promise.all(promises),
    andThen<[CommandInteraction, boolean], InteractionResponse>(
      ifElse<[[CommandInteraction, boolean]], Promise<InteractionResponse>, Promise<InteractionResponse>>(
        last,
        pipe<[[CommandInteraction, boolean]], CommandInteraction, Promise<InteractionResponse>>(
          head,
          converge(call, [
            invoker(1, 'reply'),
            applySpec({
              content: useWith(createListingLink, [prop('guildId')]),
              ephemeral: T
            })
          ])
        ),
        pipe<[[CommandInteraction, boolean]], CommandInteraction, Promise<InteractionResponse>>(
          head,
          converge(call, [
            invoker(1, 'reply'),
            applySpec({
              content: useWith(listingsLink, [prop('guildId')]),
              ephemeral: T
            })
          ])
        )
      )
    )
  )
)
