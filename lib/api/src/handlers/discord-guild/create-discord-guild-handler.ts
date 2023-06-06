import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { FirestoreDiscordGuildData } from '@echo/firestore'

export const createDiscordGuildHandler: RequestHandler<
  ApiRequest<FirestoreDiscordGuildData, never>,
  FirestoreDiscordGuildData
> = async (req, res, session) => {}
