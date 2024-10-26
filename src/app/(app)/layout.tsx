import Landing from "@/components/layout/landing";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Landing>{children}</Landing>;
}
