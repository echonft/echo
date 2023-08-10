import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreNftAttribute } from '../../types/model/collections/nft/firestore-nft-attribute'
import { FirestoreNftAttributeData } from '../../types/model/data/nft/firestore-nft-attribute-data'
import { toPromise } from '@echo/utils'
import { always, either, identity, pipe } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const convertNftAttribute: FirestoreNestedDocumentConverter<FirestoreNftAttribute, FirestoreNftAttributeData> =
  pipe(either(identity, always([])), toPromise)
