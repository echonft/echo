import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreNftAttribute } from '../../types/model/collections/nft/firestore-nft-attribute'
import { FirestoreNftAttributeData } from '../../types/model/data/nft/firestore-nft-attribute-data'
import { castAs, toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

export const convertNftAttribute: FirestoreNestedDocumentConverter<FirestoreNftAttribute, FirestoreNftAttributeData> =
  pipe<[FirestoreNftAttribute], [FirestoreNftAttribute], FirestoreNftAttributeData, Promise<FirestoreNftAttributeData>>(
    either(identity, always([])),
    castAs,
    toPromise
  )
