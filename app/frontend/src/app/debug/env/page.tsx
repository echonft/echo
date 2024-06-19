import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import { EnvVars } from '@echo/ui/components/debug/env-vars'

export default function render(_props: WithUserProps) {
  return <EnvVars vars={process.env} />
}
