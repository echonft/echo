import type { Command } from '@echo/commands/types/command'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { always, bind, ifElse, isNil, map, pick, pipe, prop } from 'ramda'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const formats = ['json' as const, 'array' as const, 'human' as const] as const
type FormatType = (typeof formats)[number]

/**
 * Arguments:
 *  -f? json|array|human  if omitted, the output will be JSON format by default.
 *                              "human" is a human readable output, in the form of "collection => address"
 *
 */
export const listCollectionsContractCommand: Command = {
  name: 'list-collection-contracts',
  execute: async function () {
    const { i } = await yargs(hideBin(process.argv))
      .options({
        f: {
          alias: 'format',
          choices: formats,
          describe: 'format',
          type: 'string'
        }
      })
      .parse()
    initializeFirebase()
    const collections = await getAllCollections()
    logOutput(collections, i as FormatType)
    await terminateFirestore()
  }
}

function logOutput(collections: Collection[], format?: FormatType): void {
  const log = bind(console.log, console)
  const stringify = bind(JSON.stringify, JSON)
  if (format === 'json') {
    pipe(
      map<Collection, Pick<Collection, 'name' | 'slug' | 'contract'>>(pick(['name', 'slug', 'contract'])),
      stringify,
      log
    )(collections)
  } else if (format === 'array') {
    pipe(map(pipe(prop('contract'), ifElse(isNil, always('error'), prop('address')))), log)(collections)
  } else {
    for (const collection of collections) {
      console.log(
        `${collection.name} => ${pipe<[Collection], Wallet, string>(prop('contract'), prop('address'))(collection)}`
      )
    }
  }
}
