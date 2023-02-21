import { convertUser } from '../../converters/user/convert-user'
import { ConvertUserOptions } from '../../types/converter/user/convert-user-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreUser } from '@echo/firestore'

export const getFirestoreUserData = (documentPath: string, options: ConvertUserOptions) =>
  getDocSnapshot<FirestoreUser>('users', documentPath).then(convertUser(options))
