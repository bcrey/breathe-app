export const metadata = {
  title: "Breathe",
  description: "A gentle breathing exercise to help you slow down and reset.",
  openGraph: {
    title: "Breathe",
    description: "A gentle breathing exercise to help you slow down and reset.",
    type: "website",
    images: [{ width: 1200, height: 630, alt: "Breathe — Take a moment." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Breathe",
    description: "A gentle breathing exercise to help you slow down and reset.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}} />
        </>}
        <style>{`
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; overflow: hidden; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
