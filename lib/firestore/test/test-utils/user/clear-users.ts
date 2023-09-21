import { deleteUser } from '@echo/firestore/crud/user/delete-user'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'

export async function clearUsers() {
  const users = await getAllUsers()
  for (const user of users) {
    try {
      await deleteUser(user.id)
    } catch (e) {
      // nothing to do
    }
  }
}
