import Navbar from "../navbar";
import Sidebar from "../sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className={`flex h-dvh w-full flex-col`}>
      <Navbar />
      <div className="relative flex h-full w-full overflow-auto">
        <Sidebar />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </main>
  );
}
