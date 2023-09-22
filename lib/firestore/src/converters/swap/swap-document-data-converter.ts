import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'

export const swapDocumentDataConverter: FirestoreDocumentDataConverter<SwapDocumentData, FirestoreSwap> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyNumberPropToDate('date'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyDatePropToNumber('date')
}
