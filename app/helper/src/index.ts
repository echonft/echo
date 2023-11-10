import { guardAsyncFn } from '@echo/helper/errors/guard-async-fn'
import { tradeExecutedHandler } from '@echo/helper/handlers/trade-executed-handler'
import { listenToWallets } from '@echo/helper/listeners/listen-to-wallets'
import { initializeServer } from '@echo/helper/services/initialize-server'
import { updateDbJob } from '@echo/helper/tasks/update-db-job'
import { listenToEchoTrades } from '@echo/web3/helpers/listen-to-echo-trades'

void (function () {
  initializeServer()
  updateDbJob()
  listenToWallets()
  listenToEchoTrades(guardAsyncFn(tradeExecutedHandler, void 0))
})()
