import { pathProvider } from '@echo/api/routing/path-provider'
import { redirect } from 'next/navigation'

export default function render() {
  redirect(pathProvider.profile.items.get())
}
