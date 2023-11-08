import { initializeServer } from '@echo/helper/services/initialize-server'
import { listenToWallets } from '@echo/helper/tasks/listen-to-wallets'
import { updateDb } from '@echo/helper/tasks/update-db'

void (function () {
  initializeServer()
  updateDb()
  listenToWallets()
})()
