import { FirestoreContract } from '../../types'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter'
import { FirestoreContractData } from '../../types/model/data'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertContract: FirestoreConverter<FirestoreContract, FirestoreContractData> = pipe<
  [FirestoreSnapshot<FirestoreContract>],
  FirestoreContractData,
  Promise<FirestoreContractData>
>(convertSnapshot, toPromise)
