import Navbar from "@/components/Navbar";
import Revalidator from "@/components/Revalidator";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Revalidator />
      <body className="bg-base-300 h-svh flex flex-col overflow-hidden">
        <Navbar />
        <main className="overflow-y-scroll max-h-[calc(100%-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
