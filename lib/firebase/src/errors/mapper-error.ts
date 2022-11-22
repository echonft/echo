import { FirebaseDocument } from '../paths/document-path'
import { isEmpty, isNil } from 'ramda'

export class FirebaseMapperError extends Error {
  constructor(id: string, collection: FirebaseDocument, additionalInfo?: string) {
    super(
      `Error mapping ${id} in ${collection}${
        !isNil(additionalInfo) && !isEmpty(additionalInfo) ? `: ${additionalInfo}` : undefined
      }`
    )
  }
}
