import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore-test/clear-db'
import { initializeDb } from '@echo/firestore-test/initialize-db'
import promptSync from 'prompt-sync'

void (async function () {
  const prompt = promptSync({ sigint: true })
  const answer = prompt('ARE YOU SURE YOU WANT TO DO THIS? [Y/n]')
  if (answer === 'Y') {
    // eslint-disable-next-line no-console
    console.log("you're the boss...")
    initializeFirebase()
    await clearDb()
    await initializeDb()
    await terminateFirestore()
  } else {
    // eslint-disable-next-line no-console
    console.log('phew')
  }
})()
