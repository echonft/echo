import { deleteUser } from '@test-utils/user/delete-user'
import { getAllUsers } from '@test-utils/user/get-all-users'

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
