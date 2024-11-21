import { auth } from "@/auth/authOptions";
import HomeModule from "@/components/home/module";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <HomeModule session={session} />
    </div>
  );
}
