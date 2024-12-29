import { LogoutButton } from "./LogoutButton";
import { getAuthSession } from "../lib/auth";

export const User = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return <p>No user</p>;
  }

  return (
    <div className=" border-white border w-96 shadow-xl rounded-lg">
      <figure>
        <img
          className="rounded-3xl size-20"
          src={session.user.image ?? ""}
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{session.user.name}</h2>
        <p>{session.user.email}</p>
        <p>{session.user.id}</p>
        <div className="card-actions justify-end">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
