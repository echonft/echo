import { convertUser } from '../../converters/user/convert-user'
import { ConvertUserOptions } from '../../types/converter/user/convert-user-options'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreUserData = (documentPath: string, options: ConvertUserOptions) =>
  pipe(getDocSnapshot, andThen(convertUser(options)))('users', documentPath)
