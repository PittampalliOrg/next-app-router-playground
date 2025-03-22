import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata } from 'next';
import { TelemetryProvider } from '../ui/telemetry-provider';
import { trace } from '@opentelemetry/api';

export async function generateMetadata(): Promise<Metadata> {
  const activeSpan = trace.getActiveSpan();

  return {
    metadataBase: new URL('https://chat.vercel.ai'),
    title: 'Next.js Chatbot Template',
    description: 'Next.js chatbot template using the AI SDK.',
    other: {
      traceparent: activeSpan
        ? `00-${activeSpan.spanContext().traceId}-${
            activeSpan.spanContext().spanId
          }-01`
        : '',
    },
  } satisfies Metadata;
}

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Client instrumentation started.');
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="overflow-y-scroll bg-gray-1100 bg-[url('/playground/grid.svg')] pb-36">
        <TelemetryProvider>
          <GlobalNav />

          <div className="lg:pl-72">
            <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
              <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                <div className="rounded-lg bg-black">
                  <AddressBar />
                </div>
              </div>

              <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                <div className="rounded-lg bg-black p-3.5 lg:p-6">
                  {children}
                </div>
              </div>
              <Byline />
            </div>
          </div>
        </TelemetryProvider>
      </body>
    </html>
  );
}
