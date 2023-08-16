import { CollectionName } from '../../constants/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreUserData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertUser))(CollectionName.USERS, documentPath)
