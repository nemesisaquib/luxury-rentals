import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Hearth & Key",
  description: "User dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-cream-2">
      {/* Sidebar */}
      <aside className="w-64 bg-cream-2 text-ink flex flex-col pt-12 border-r hairline relative z-10">
        <nav className="flex-1 space-y-2 px-6">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-moss mb-6 pl-4">Your Account</h2>
          <Link href="/dashboard" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream transition-all hover:pl-5">
            Overview
          </Link>
          <Link href="/dashboard/bookings" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream transition-all hover:pl-5">
            My Bookings
          </Link>
          <Link href="/dashboard/profile" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream transition-all hover:pl-5">
            Profile Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-12 px-12 overflow-y-auto">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}
