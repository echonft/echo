import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreNftAttribute, FirestoreNftAttributeData } from '@echo/firestore'
import { toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const convertNftAttribute: FirestoreNestedDocumentConverter<FirestoreNftAttribute, FirestoreNftAttributeData> =
  pipe(either(identity, always([])), toPromise)
