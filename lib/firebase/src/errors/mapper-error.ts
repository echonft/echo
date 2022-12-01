import { FirebaseDocument } from '../types'
import { isEmpty, isNil } from 'rambda'

export class FirebaseMapperError extends Error {
  constructor(id: string, collection: FirebaseDocument, additionalInfo?: string) {
    super(
      `Error mapping ${id} in ${collection}${
        !isNil(additionalInfo) && !isEmpty(additionalInfo) ? `: ${additionalInfo}` : ''
      }`
    )
  }
}
