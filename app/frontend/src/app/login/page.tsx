import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { User } from '@echo/model/types/user'
import { LoginPage } from '@echo/ui/pages/login/login-page'
import type { Nullable } from '@echo/utils/types/nullable'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
  user: Nullable<User>
}

function render({ searchParams: { callbackUrl }, user }: Props) {
  return Promise.resolve(<LoginPage callbackUrl={callbackUrl} user={user} />)
}

export default withUser(render)
