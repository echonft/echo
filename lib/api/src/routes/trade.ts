import { ironOptions } from '../config/iron-options'
import { createTradeHandler } from '../handlers/trade/create-trade-handler'
import { deleteTradeHandler } from '../handlers/trade/delete-trade-handler'
import { updateTradeHandler } from '../handlers/trade/update-trade-handler'
import { CreateTradeRequest, DeleteTradeRequest, ErrorResponse, TradeResponse, UpdateTradeRequest } from '../types'
import { withMethodValidation } from '../utils/with-method-validation'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<TradeResponse | ErrorResponse>) => {
  const { method } = req
  if (method === 'POST') {
    await createTradeHandler(req as CreateTradeRequest, res)
  } else if (method === 'PUT') {
    await updateTradeHandler(req as UpdateTradeRequest, res)
  } else {
    await deleteTradeHandler(req as DeleteTradeRequest, res)
  }
}

export const trade = withIronSessionApiRoute(withMethodValidation(handler, ['PUT', 'DELETE', 'POST']), ironOptions)
