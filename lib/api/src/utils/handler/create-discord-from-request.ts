import { createDiscordSchema } from '../../types/validators/create-discord'
import { createAndPopulateNftCollection } from './create-and-populate-nft-collection'
import { fetchContractMetadataFromRequest } from './fetch-contract-metadata-from-request'
import { addDiscordGuildAndContracts } from '@echo/firebase-admin'
import { FirestoreContractPrototype, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { equals, find, omit, pipe, prop } from 'ramda'
import { z } from 'zod'

export const createDiscordFromRequest = (request: z.infer<typeof createDiscordSchema>) =>
  Promise.all(request.contracts.map(fetchContractMetadataFromRequest)).then((contractsMetadata) => {
    const contractPrototypes = contractsMetadata.map((contractMetadata) => contractMetadata.contract)
    return addDiscordGuildAndContracts({ ...request, contracts: contractPrototypes }).then((discordGuildResult) => {
      if (R.isError(discordGuildResult)) {
        throw new Error('createDiscordFromRequest Error adding Discord Guild and Contracts')
      }
      const discordGuildData = R.getExn(discordGuildResult)
      return Promise.all(
        discordGuildData.contracts.map((contract) => {
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
              discordGuildId: discordGuildData.id
            } as FirestoreNftCollectionPrototype,
            contract.address
          )
        })
      ).then(() => discordGuildData)
    })
  })
