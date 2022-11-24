import "../styles/globals.css";
import Header from "./Header";

// Install Poppins font:
import { Poppins } from "@next/font/google";

// Select font weights:
const customFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={customFont.className}>
      <head />

      <body className="relative mx-auto h-screen max-w-[1440px] overflow-hidden bg-gradient-radial bg-no-repeat p-8 text-white">
        {/* top right decoration */}
        <div className="absolute -top-72 -right-48 -z-10 h-[915px] w-[915px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>

        {/* top left decoration */}
        <div className="absolute -top-40 -left-24 -z-10 h-[637px] w-[637px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>

        {/* bottom right decoration */}
        <div className="absolute top-[688px] -right-48 -z-10 h-[664px] w-[664px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl"></div>

        <Header />

        {children}
      </body>
    </html>
  );
}
