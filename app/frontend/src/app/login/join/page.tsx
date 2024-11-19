import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import type { User } from '@echo/model/types/user'
import { LoginJoinEchoStep } from '@echo/ui/components/base/auth/login-join-echo-step'

interface Props {
  user: User
}

function render({ user }: Props) {
  return <LoginJoinEchoStep username={user.username} />
}

export default withLoggedInUser(render)
