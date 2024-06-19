import "./globals.css";

import { Footer, NavBar } from "@/components";

export const metadata = {
  title: "EventPulse",
  description:
    "EventPulse - лучшее веб-приложения для поиска мероприятий в СПБ!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
