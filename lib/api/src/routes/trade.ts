import { ironOptions } from '../config/iron-options'
import { createTradeHandler } from '../handlers/trade/create-trade-handler'
import { deleteTradeHandler } from '../handlers/trade/delete-trade-handler'
import { updateTradeHandler } from '../handlers/trade/update-trade-handler'
import { ErrorResponse, TradeResponse } from '../types'
import { CreateTradeApiRequest } from '../types/models/api-requests/create-trade-api-request'
import { DeleteTradeApiRequest } from '../types/models/api-requests/delete-trade-api-request'
import { UpdateTradeApiRequest } from '../types/models/api-requests/update-trade-api-request'
import { withMethodValidation } from '../utils/with-method-validation'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<TradeResponse | ErrorResponse>) => {
  const { method } = req
  if (method === 'POST') {
    await createTradeHandler(req as CreateTradeApiRequest, res)
  } else if (method === 'PUT') {
    await updateTradeHandler(req as UpdateTradeApiRequest, res)
  } else {
    await deleteTradeHandler(req as DeleteTradeApiRequest, res)
  }
}

export const trade = withIronSessionApiRoute(withMethodValidation(handler, ['PUT', 'DELETE', 'POST']), ironOptions)
