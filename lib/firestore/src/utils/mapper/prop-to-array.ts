import { FirestoreMapper } from '../../types/mapper'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { toPromise } from '@echo/utils'
import { map, pipe, prop } from 'ramda'

export const propToArray = <T extends FirestoreData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  pipe(prop<T[]>(key), map(pipe(toPromise, mapper)), (promises) => Promise.all(promises))
