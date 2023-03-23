import { getServerConfig } from '../../config/get-server-config'

// TODO Remove this
export const loginLink: string = encodeURI(`${getServerConfig().url}/login`)
