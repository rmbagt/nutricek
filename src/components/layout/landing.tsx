import Footer from "../footer";
import Navbar from "../navbar";

export default function Landing({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-full w-full flex-col">
      <Navbar />
      <div className="w-full px-4 md:px-10">{children}</div>
      <Footer />
    </main>
  );
}
