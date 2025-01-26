import type { Metadata } from "next";
import "@/app/globals.css";
import "@/assets/fonts/font.css";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "Arman Crm",
  description: "Arman Crm - developed by taraneh mohebi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
