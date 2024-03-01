import { Empty } from "../config/type";
import { prisma } from "../helper/prisma";

export default class UserPaymentRepository {
  async index(
    param?: Record<string, any> | Empty
  ): Promise<Record<string, any>> {
    const result = await prisma.payment.findMany({
      where: { active: true },
      orderBy: {
        name: "asc",
      },
    });

    const data = {
      data: result as any,
    };

    return data;
  }
}
