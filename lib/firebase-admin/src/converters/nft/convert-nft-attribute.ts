import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreNftAttribute, FirestoreNftAttributeData } from '@echo/firestore'
import { castAs, toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

export const convertNftAttribute: FirestoreNestedDocumentConverter<FirestoreNftAttribute, FirestoreNftAttributeData> =
  pipe<[FirestoreNftAttribute], [FirestoreNftAttribute], FirestoreNftAttributeData, Promise<FirestoreNftAttributeData>>(
    either(identity, always([])),
    castAs,
    toPromise
  )
