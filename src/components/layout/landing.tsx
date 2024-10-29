import Sidebar from "./sidebar";

export default function Landing({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full flex-col">
      <div className="w-full px-5 pt-8 md:px-10">{children}</div>
      <Sidebar />
    </main>
  );
}
