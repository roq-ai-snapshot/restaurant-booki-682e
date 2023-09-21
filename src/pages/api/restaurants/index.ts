import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRestaurants();
    case 'POST':
      return createRestaurant();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRestaurants() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.restaurant
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'restaurant'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createRestaurant() {
    await restaurantValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.chef?.length > 0) {
      const create_chef = body.chef;
      body.chef = {
        create: create_chef,
      };
    } else {
      delete body.chef;
    }
    if (body?.menu?.length > 0) {
      const create_menu = body.menu;
      body.menu = {
        create: create_menu,
      };
    } else {
      delete body.menu;
    }
    if (body?.table_reservation?.length > 0) {
      const create_table_reservation = body.table_reservation;
      body.table_reservation = {
        create: create_table_reservation,
      };
    } else {
      delete body.table_reservation;
    }
    if (body?.waiter?.length > 0) {
      const create_waiter = body.waiter;
      body.waiter = {
        create: create_waiter,
      };
    } else {
      delete body.waiter;
    }
    const data = await prisma.restaurant.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
