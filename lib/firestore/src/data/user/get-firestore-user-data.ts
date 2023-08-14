import { CollectionName } from '../../config/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreUserData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertUser))(CollectionName.USERS, documentPath)
