import { auth } from '@echo/auth/auth'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { isNil } from 'ramda'

export async function getAuthUser(): Promise<UserDocumentData | null> {
  const session = await auth()
  if (isNil(session) || isNil(session.user)) {
    return null
  }
  // we need to keep this if we want tsc to work on other packages
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return session.user as UserDocumentData
}
