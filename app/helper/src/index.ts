import { OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } from '@echo/firestore/constants/offer/offer-state-update-trigger-by-system'
import { completeOffer } from '@echo/firestore/crud/offer/complete-offer'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/sentry/guard-async-fn'
import { initializeSentry } from '@echo/sentry/initialize-sentry'
import { logger } from '@echo/utils/services/logger'
import { listenToEchoTrades } from '@echo/web3/helpers/viem/listen-to-echo-trades'
import { isNotNil } from 'ramda'

void (function () {
  initializeSentry('https://3c218cae136c11a81754cc4749d2ae22@o4506149604098048.ingest.sentry.io/4506202719256576')
  initializeFirebase()
  listenToEchoTrades(
    guardAsyncFn(async function (offerId: string, transactionId: string) {
      logger.info(`trade executed: offerId ${offerId} transactionId ${transactionId}`)
      const offer = await findOfferById(offerId)
      if (isNotNil(offer)) {
        await completeOffer({
          offerId,
          transactionId,
          updateArgs: { trigger: { by: OFFER_STATE_UPDATE_TRIGGER_BY_SYSTEM } }
        })
      }
    })
  )
})()
