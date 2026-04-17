import prisma from "../../../utils/prisma";
import {IProduct} from "./product.interface";

const createProduct = async (payload: IProduct) => {
  return await prisma.product.create({
    data: {
      ...payload,
      availableStock: payload.totalStock,
    },
  });
};

const getAllProducts = async (query: Record<string, any>) => {
  const {name, page, limit} = query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const where: any = {};
  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.product.count({where}),
  ]);

  return {
    products,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  };
};

export const productServices = {
  createProduct,
  getAllProducts,
};
