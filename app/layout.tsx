import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Karrot Market',
    default: 'Karrot Market',
  },
  description: 'Sell and buy all the things!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-800 *:text-slate-300">
        <main className="h-full flex items-center justify-center">
          <div className="w-96 h-4/6 flex flex-col justify-between overflow-scroll relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
