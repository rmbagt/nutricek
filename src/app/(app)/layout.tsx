import Landing from "@/components/layout/landing";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Landing>
      <main>{children}</main>
      <Toaster />
    </Landing>
  );
}
