import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter'
import { convertToFirestoreData } from '../../utils/converter/convert-to-firestore-data'
import { FirestoreContract, FirestoreContractData } from '@echo/firestore'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertContract: FirestoreConverter<FirestoreContract, FirestoreContractData> = pipe<
  FirestoreSnapshot<FirestoreContract>[],
  FirestoreContractData,
  Promise<FirestoreContractData>
>(convertToFirestoreData, toPromise)
