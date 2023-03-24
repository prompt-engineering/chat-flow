import "@/app/globals.css";
import React from "react";
import NavBar from "@/layout/NavBar";
import { Provider } from "@/components/ChakraUI/Provider";
import { Analytics } from "@vercel/analytics/react";

type RootLayoutProps = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};
export default function RootLayout({ params, children }: RootLayoutProps) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <title>ChatFlow, personalize your ChatGPT workflows and build the road to automation。</title>
        <meta
          name='description'
          content='ChatFlow, personalize your ChatGPT workflows and build the road to automation。'
        />
        <meta name='keywords' content='GitHub Copilot, Prompt Programming, Prompt, Stable Diffusion' />
      </head>
      <body>
        <Provider>
          {/* https://github.com/vercel/next.js/issues/42292 */}
          <div className='fixed bg-white left-0 right-0 top-0 z-50'>
            {/* @ts-expect-error Async Server Component */}
            <NavBar locale={lang} />
          </div>
          {children}
        </Provider>

        <Analytics />
      </body>
    </html>
  );
}
