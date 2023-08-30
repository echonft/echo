import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { User } from '../../types/model/user'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

export const addUser = async (user: Omit<User, 'id' | 'nonce' | 'updatedAt' | 'wallets'>): Promise<string> => {
  const reference = firestore().collection(CollectionName.USERS).doc()
  const id = reference.id
  const newUser = pipe(
    assoc('id', id),
    assoc('nonce', undefined),
    assoc('updatedAt', dayjs()),
    assoc('wallets', [])
  )(user)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(userDataConverter.toFirestore(newUser))
  return id
}
