import { FirestoreContract } from '../../types'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter'
import { FirestoreContractData } from '../../types/model/data'
import { convertToFirestoreData } from '../../utils/converter/convert-to-firestore-model'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertContract: FirestoreConverter<FirestoreContract, FirestoreContractData> = pipe<
  FirestoreSnapshot<FirestoreContract>[],
  FirestoreContractData,
  Promise<FirestoreContractData>
>(convertToFirestoreData, toPromise)
