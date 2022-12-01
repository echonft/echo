import { OfferItem } from '@echo/model'
import { errorMessage } from '@echo/utils'
export function parseOfferItem(offerItemString: string): OfferItem {
  try {
    const offerItem = JSON.parse(offerItemString) as Record<string, unknown>
    // TODO validate json (see https://gcanti.github.io/io-ts/)
    return offerItem as unknown as OfferItem
  } catch (error) {
    throw Error(`error parsing offer item.\ninput: ${offerItemString}\nerror:${errorMessage(error)}`)
  }
}
