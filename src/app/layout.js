import { Inter } from "next/font/google";
import "./globals.css";
import { redirect } from 'next/navigation';
import { HighContrastProvider } from './components/HighContrastProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dora The Web Developer",
  description: "Learn HTML and CSS through interactive block-based coding. Build websites visually while understanding the code behind them.",
  keywords: "HTML, CSS, block code, web development, learning, tutorial, coding",
  authors: [{ name: "Dora The Web Developer Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    redirect('/tutorials');
    return null;
  }
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#4F46E5" />
        <link rel="icon" href="/dora.png" sizes="any" />
      </head>
      <body className={`${inter.className} h-full`}>
        <HighContrastProvider>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-blue-600 focus:text-white focus:p-4"
          >
            Skip to main content
          </a>
          <div id="main-content">
            {children}
          </div>
        </HighContrastProvider>
      </body>
    </html>
  );
}
