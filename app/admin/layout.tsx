import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "Admin | Hearth & Key",
  description: "Admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-cream-2">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-cream-2 flex flex-col pt-12 shadow-[4px_0_24px_rgba(29,42,35,0.1)] relative z-10">
        <div className="px-8 pb-8 text-xl font-serif italic text-gold">H&K Admin</div>
        <nav className="flex-1 space-y-2 px-4">
          <Link href="/admin" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Dashboard
          </Link>
          <Link href="/admin/listings" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Listings
          </Link>
          <Link href="/admin/bookings" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Bookings
          </Link>
          <Link href="/admin/users" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Users
          </Link>
          <Link href="/admin/messages" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Messages
          </Link>
          <Link href="/admin/careers" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Careers
          </Link>
          <Link href="/admin/faqs" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            FAQs
          </Link>
          <Link href="/admin/settings" className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-cream/10 transition-all hover:pl-5">
            Settings
          </Link>
        </nav>
        <div className="p-6">
          <LogoutButton className="w-full text-center rounded-full border hairline border-clay/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-clay hover:bg-clay hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-12 px-12 overflow-y-auto">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
