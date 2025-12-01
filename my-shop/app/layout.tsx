import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shop",
  description: "Powered by Next.js + Strapi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Providers>
          <Header />

          <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
