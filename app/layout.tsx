 
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Metadata } from "next";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "NoteHub — Швидкі нотатки",
  description:
    "NoteHub — застосунок для створення, пошуку та організації нотаток за тегами.",

  openGraph: {
    title: "NoteHub — Швидкі нотатки",
    description:
      "NoteHub — застосунок для створення, пошуку та організації нотаток за тегами.",
    url: "https://08-zustand-oom2xdb7h-harry1potters-projects.vercel.app/",
    images: [
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    ],
  },
};

export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

