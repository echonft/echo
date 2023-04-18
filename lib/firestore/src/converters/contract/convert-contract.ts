import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertContract: FirestoreConverter<FirestoreContract, FirestoreContractData> = pipe<
  [FirestoreSnapshot<FirestoreContract>],
  FirestoreContractData,
  Promise<FirestoreContractData>
>(convertRootCollectionDocumentSnapshot, toPromise)
