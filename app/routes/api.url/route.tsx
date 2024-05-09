import { ActionFunctionArgs, json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function action({ request }: ActionFunctionArgs) {
  const method = await request.method;
  const body = await request.json();
  const shortId = nanoid(8);

  switch (method) {
    case "POST":
      try {
        const client = await prisma.url.upsert({
          where: { redirectUrl: body.url },
          create: {
            shortId,
            redirectUrl: body.url,
          },
          update: {},
        });

        return json(client);
      } catch (error) {
        console.log(error);
        return json(error);
      }

    default:
      return json({ message: "Wrong Route" },{status:400});
  }
}

