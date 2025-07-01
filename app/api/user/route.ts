import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ error: "Not authenticated" }),
      { status: 401 }
    );
  }

  return new Response(JSON.stringify({ user: session.user }), {
    status: 200,
  });
}