/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildContract } from '../../builders/contract/build-contract'
import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { CollectionName } from '../../constants/collection-name'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../helpers/document/set-doc-and-return-snapshot'
import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { FirestoreDiscordGuildPrototype } from '../../types/prototypes/discord-guild/firestore-discord-guild-prototype'
import { andThen, mergeRight, partialRight, pipe } from 'ramda'

export const addDiscordGuildAndContracts = (
  discordGuildPrototype: FirestoreDiscordGuildPrototype
): Promise<FirestoreDiscordGuildData> =>
  Promise.all(discordGuildPrototype.contracts.map(buildContract)).then(
    (contracts) =>
      // @ts-ignore
      Promise.all(
        contracts.map((contract) =>
          setDocAndReturnSnapshot(getCollectionFromPath(CollectionName.CONTRACTS).doc(), contract)
        )
      ).then((contractSnapshots) =>
        pipe(
          mergeRight({ contractRefs: contractSnapshots.map((snapshot) => snapshot.ref.id) }),
          buildDiscordGuild,
          // @ts-ignore
          andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.GUILDS).doc()])),
          andThen(convertDiscordGuild)
        )
      )(discordGuildPrototype) as Promise<FirestoreDiscordGuildData>
  )
