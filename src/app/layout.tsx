import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import NavbarMain from '@/components/shared/Navbar/NavbarMain';
import { ThemeProvider } from 'next-themes';
import ReduxProvider from '@/providers/ReduxProvider';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import { Footer } from '@/components/shared/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
import Script from 'next/script';
import BottomBar from '@/components/shared/BottomBar';

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'], // Adjust as needed
});

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: 'Gadget Grid - Your One-Stop Shop for IT Products & Gadgets',
    template: '%s - Gadget Grid',
  },
  description:
    'Discover the latest IT products at Gadget Grid. Shop cutting-edge gadgets, electronics, and tech accessories with fast shipping and unbeatable prices.',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    url: websiteUrl,
    title: 'Gadget Grid - Your One-Stop Shop for IT Products & Gadgets',
    description:
      'Explore a wide range of IT products at Gadget Grid. From computers to gaming gear, find the latest tech with fast delivery and great deals.',
    images: [
      {
        url: `${websiteUrl}/logo/logo-white.png`,
        alt: 'Gadget Grid IT Products',
      },
    ],
    siteName: 'Gadget Grid',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="--eCCXU2d1FsAoqE1NhPUZb60c0zMIi7V0IrUZ4heRg"
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-W2MVH079S2');
        `}
        </Script>
      </head>
      <body className={`${beVietnam.variable} antialiased`}>
        <ThemeProvider
          attribute="class" // This is crucial!
          defaultTheme="light"
          // enableSystem={true}
        >
          <div className="bg-background">
            <NextTopLoader color="#f85a16" showSpinner={false} />
            <ReduxProvider>
              <AuthProvider>
                <NavbarMain />
                {children}
                <Footer />
                <BottomBar />
              </AuthProvider>
            </ReduxProvider>
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
