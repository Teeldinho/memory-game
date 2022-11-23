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

      <body className="relative h-screen p-8 mx-auto overflow-hidden text-white bg-no-repeat bg-gradient-radial max-w-[1440px]">
        {/* top right decoration */}
        <div className="absolute h-[915px] w-[915px] -top-72 -right-24 rounded-full bg-white -z-10 bg-gradient-decorator-circle blur-2xl"></div>

        {/* top left decoration */}
        <div className="absolute h-[637px] w-[637px] -top-40 -left-24 rounded-full bg-white -z-10 bg-gradient-decorator-circle blur-2xl"></div>

        {/* bottom right decoration */}
        <div className="absolute h-[664px] w-[664px] top-[688px] right-0 rounded-full bg-white -z-10 bg-gradient-decorator-circle blur-2xl"></div>

        <Header />

        {children}
      </body>
    </html>
  );
}
