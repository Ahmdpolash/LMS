import { Mona_Sans } from "next/font/google";
import "../globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={`${monaSans.variable}`}>{children}</div>
    </>
  );
}
