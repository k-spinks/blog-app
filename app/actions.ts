/* File for server actions. Server actions are functions which run on the server. They can be used to handle data mutations, perform authentication or safely run logic that shouldnt be exposed to the client. These can be written in file or in components */

"use server"; // Makes this into a server action
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function HandleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  /* Server actions are treated as public http endpoints and should be treated with the same security assumptions and authorization checks. */

  // This will check if a user is authorized and if not will redirect to register
  if (!user) {
    return redirect("api/auth/register");
  }

  // Grabs the named fields from the form data
  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imgUrl: url as string,
      authorId: user.id,
      authorImage: user.picture as string,
      authorName: user.given_name as string,
    },
  });

  return redirect("/dashboard");
}
