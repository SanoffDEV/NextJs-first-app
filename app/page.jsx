import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { User } from "@/src/auth/User";
import { getAuthSession } from "@/src/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    return <User />;
  }
  return (
    <div>
      <LoginButton />
    </div>
  );
}
