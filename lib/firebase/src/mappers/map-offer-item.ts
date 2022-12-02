import { OfferItem } from '@echo/model'
import { errorMessage } from '@echo/utils'
import { isEmpty, isNil } from 'rambda'

function parseOfferItem(offerItemString: string): OfferItem {
  try {
    const offerItem = JSON.parse(offerItemString) as Record<string, unknown>
    // TODO validate json (see https://gcanti.github.io/io-ts/)
    return offerItem as unknown as OfferItem
  } catch (error) {
    throw Error(`error parsing offer item.\ninput: ${offerItemString}\nerror:${errorMessage(error)}`)
  }
}
export function mapOfferItem(itemsString: string): OfferItem[] {
  if (isNil(itemsString) || isEmpty(itemsString)) {
    return []
  }
  return itemsString.split(',').map(parseOfferItem)
}
