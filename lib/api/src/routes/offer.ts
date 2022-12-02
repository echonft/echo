import { ironOptions } from '../config/iron-options'
import { createOfferHandler } from '../handlers/offer/create-offer-handler'
import { deleteOfferHandler } from '../handlers/offer/delete-offer-handler'
import { updateOfferHandler } from '../handlers/offer/update-offer-handler'
import { CreateOfferRequest, DeleteOfferRequest, ErrorResponse, OfferResponse, UpdateOfferRequest } from '../types'
import { withExistingUser } from '../utils/with-existing-user'
import { withMethodValidation } from '../utils/with-method-validation'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<OfferResponse | ErrorResponse>): Promise<void> => {
  const { method } = req
  if (method === 'POST') {
    await createOfferHandler(req as CreateOfferRequest, res)
  } else if (method === 'PUT') {
    await updateOfferHandler(req as UpdateOfferRequest, res)
  } else {
    await deleteOfferHandler(req as DeleteOfferRequest, res)
  }
}

export const offer = withIronSessionApiRoute(
  withExistingUser(withMethodValidation(handler, ['PUT', 'DELETE', 'POST'])),
  ironOptions
)
