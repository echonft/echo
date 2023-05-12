import { logger } from '@echo/utils'
import { DocumentData, DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'

export const setDocAndReturnSnapshot = <T extends DocumentData>(
  doc: DocumentReference<T>,
  data: T
): Promise<R.Result<DocumentSnapshot<T>, Error>> => {
  try {
    return R.fromPromise(doc.set(data).then(() => doc.get()))
  } catch (reason) {
    logger.error(`setDocAndReturnSnapshot error: ${reason}`)
    return R.fromPromise(Promise.reject(reason))
  }
}
