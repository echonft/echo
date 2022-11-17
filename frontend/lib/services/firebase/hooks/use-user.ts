import { mapUser } from '@echo/firebase/mappers/user'
import { FirebaseUser } from '@echo/firebase/model/user'
import { FirebaseDocumentPath } from '@echo/firebase/paths/document-path'
import { useDocument } from '@echo/frontend/lib/hooks/use-document'
import { User } from '@echo/model/user'
import { useAccount } from 'wagmi'

export function useUser() {
  const { address } = useAccount()
  return useDocument<FirebaseUser, User>(FirebaseDocumentPath.USERS, address && address, { mapper: mapUser })
}
