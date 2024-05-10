import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";

export async function loader() {
  const prisma = new PrismaClient();

  const allDetails = await prisma.url.findMany({
    where: {},
    select: {
      id: true,
      shortId: true,
      redirectUrl: true,
      visitHistory: {
        select: {
          createdAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  const sortedDetails = allDetails.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return json(sortedDetails);
}
