import { linkProvider } from '@echo/api/routing/link-provider'
import { redirect } from 'next/navigation'

export default function render() {
  redirect(linkProvider.profile.items.get())
}
