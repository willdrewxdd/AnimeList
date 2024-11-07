import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"], 
  variable: "--font-poppins",
  display: "swap",
});


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CuyAnimeList",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         className={`${poppins.variable} bg-dark antialiased suppressHydrationWarning=${true}`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
