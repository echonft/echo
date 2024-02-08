import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { addCollection, type AddCollectionArgs } from '@echo/helper/tasks/add-collection'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

void (async function () {
  const argv = yargs(hideBin(process.argv))
    .string('address')
    .string('overrideAddress')
    .parse() as unknown as AddCollectionArgs
  await addCollection(argv)
  await terminateFirestore()
})()
