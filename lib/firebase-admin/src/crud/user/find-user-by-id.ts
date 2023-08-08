import { getFirestoreUserData } from '../../data/user/get-firestore-user-data'

export const findUserById = (id: string) => getFirestoreUserData(id)
