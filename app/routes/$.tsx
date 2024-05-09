import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const pathName = new URL(request.url).pathname.split("/")[1];
  const prisma = new PrismaClient();

  console.log(pathName);

  const client = await prisma.url.update({
    where: { shortId: pathName },
    data: {
      visitHistory: {
        create: {},
      },
    },
  });
  return Response.redirect(client.redirectUrl);
}
