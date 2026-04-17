import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client";

import config from "../app/config";
const adapter = new PrismaPg({
  connectionString: config.db_url,
});
const prisma = new PrismaClient({adapter});

export default prisma;
