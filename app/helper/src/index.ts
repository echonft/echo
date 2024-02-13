import { guardAsyncFn } from '@echo/helper/errors/guard-async-fn'
import { tradeExecutedHandler } from '@echo/helper/handlers/trade-executed-handler'
import { initializeServer } from '@echo/helper/services/initialize-server'
import { listenToEchoTrades } from '@echo/web3/helpers/viem/listen-to-echo-trades'

void (function () {
  initializeServer()
  listenToEchoTrades(guardAsyncFn(tradeExecutedHandler, void 0))
})()
