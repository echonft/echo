import { UserError } from '@echo/firestore-functions/constants/errors/user-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { eqAddress } from '@echo/model/helpers/eq-address'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { isNil } from 'ramda'

export const onUserWritten = onDocumentWritten(
  setMaxInstances({ document: `${CollectionPath.Users}/{id}`, timeoutSeconds: 540 }),
  async (event) => {
    if (!isNil(event.data)) {
      const user = event.data.after.data() as Nullable<UserDocument>
      if (!isNil(user) && !isNil(user.wallet)) {
        const before = event.data.before.data() as Nullable<UserDocument>
        if (isNil(before?.wallet) || !eqAddress(user.wallet, before.wallet)) {
          try {
            await updateNftsForWallet(user.wallet)
          } catch (err) {
            error({ err, user }, UserError.UpdateNfts)
          }
          return
        }
      }
    }
  }
)
