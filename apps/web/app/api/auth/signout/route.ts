import { authFetch } from "@/lib/authFetch";
import { BACKEND_URL } from "@/lib/constants";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { NextRequest,NextResponse } from "next/server";
import { relative } from "path";

export async function GET(req: NextRequest) {

  const response = await authFetch(`${BACKEND_URL}/auth/signout`,{
    method: "POST",
  });
  if(response.ok){await deleteSession();}
  
  revalidatePath("/","layout");
  revalidatePath("/","page")
  return NextResponse.redirect(new URL("/", req.nextUrl));

}