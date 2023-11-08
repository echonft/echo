import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'

/**
 * Function to initialize anything needed on the server
 */
export function initializeServer() {
  initializeFirebase()
}
