import { createDiscordSchema } from '../../types/validators/create-discord'
import { createAndPopulateNftCollection } from './create-and-populate-nft-collection'
import { fetchContractMetadataFromRequest } from './fetch-contract-metadata-from-request'
import {
  addDiscordGuildAndContracts,
  FirestoreContractPrototype,
  FirestoreNftCollectionPrototype
} from '@echo/firestore'
import { equals, find, omit, pipe, prop } from 'ramda'
import { z } from 'zod'

export const createDiscordFromRequest = (request: z.infer<typeof createDiscordSchema>) =>
  Promise.all(request.contracts.map(fetchContractMetadataFromRequest)).then((contractsMetadata) => {
    const contractPrototypes = contractsMetadata.map((contractMetadata) => contractMetadata.contract)
    return addDiscordGuildAndContracts({ ...request, contracts: contractPrototypes })
      .then((discordGuild) => {
        return Promise.all(
          discordGuild.contracts.map((contract) => {
            const collectionPrototype: Omit<FirestoreNftCollectionPrototype, 'discordGuildId' | 'contractId'> = pipe(
              find(
                pipe(prop<FirestoreContractPrototype>('contract'), prop('address'), equals(prop('address', contract)))
              ),
              omit(['contract'])
            )(contractsMetadata)
            return createAndPopulateNftCollection(
              {
                ...collectionPrototype,
                contractId: contract.id,
                discordGuildId: discordGuild.id
              } as FirestoreNftCollectionPrototype,
              contract.address
            )
          })
        ).then(() => discordGuild)
      })
      .catch(() => {
        return Promise.reject('createDiscordFromRequest Error adding Discord Guild and Contracts')
      })
  })
