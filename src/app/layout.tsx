import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AYUCLINIC AI — Classical Ayurvedic Clinical Assessment & Decision Support Platform',
  description: 'Evidence-informed clinical decision support system grounded in Charaka, Sushruta and Vagbhata Samhitas. Prakriti, Vikriti, Agni, Kostha and AI Differential Diagnosis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-ayur-ivory text-ayur-slate min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
