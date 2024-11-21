import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { SignIn } from "./page.client";
import { auth } from "@/auth/authOptions";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect("/home");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold text-[#91C788]">
            NutriCek
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignIn />
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-gray-600">
            Please login with one of the providers above
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
