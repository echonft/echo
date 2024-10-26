import type { User } from '@echo/model/types/user'
import { EnvVars } from '@echo/ui/components/debug/env-vars'
import type { Nullable } from '@echo/utils/types/nullable'

interface Props {
  user: Nullable<User>
}

export default function render(_props: Props) {
  return <EnvVars vars={process.env} />
}
