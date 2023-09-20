import type { AuthUser } from '@echo/ui/types/model/auth-user'

const authUser: AuthUser = {
  id: 'johnnycagewins',
  name: 'johnnycagewins',
  image: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png'
}

export function getAuthUser() {
  return authUser
}
