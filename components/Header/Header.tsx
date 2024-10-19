import { DarkModeToggle } from "../DarkToogle";
import { ButtonMenu } from "../ButtonMenu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserButton } from "../UserButton";
import { connectDB } from "@/db/mongoose";
import User from "@/models/User.model";

export async function Header() {
  const session = await getServerSession();

  if (!session || !session?.user?.email) {
    return redirect("/login");
  }
  let user = null;
  try {
    connectDB();
    const resp = await User.findOne({ email: session.user.email });
    if (resp) {
      user = resp;
    }
  } catch (error) {
    console.error(error);
  }
  return (
    <header className="h-16 bg-backgroundBox shadow z-20 px-6">
      <div className="h-full flex items-center justify-between lg:justify-end">
        <ButtonMenu />
        <div className="flex items-center gap-x-1">
          <DarkModeToggle />
          <UserButton user={user} />
        </div>
      </div>
    </header>
  );
}
