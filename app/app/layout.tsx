import type { Metadata } from "next";
import profile from "../../content/resume-profile.json";
import "./globals.css";
import "./resume-tokens.css";
import "../../content/resume-layout.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blakelin-lsy.github.io"),
  title: `${profile.identity.name} — ${profile.identity.role}`,
  description: profile.copy.en.metadataDescription,
  alternates: { canonical: "/web-resume/" },
  openGraph: {
    type: "website",
    title: `${profile.identity.name} — ${profile.identity.role}`,
    description: profile.copy.en.metadataDescription,
    url: "/web-resume/",
    locale: "en_US",
    alternateLocale: ["zh_TW"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning>
    {children}
    <noscript><style>{`[data-js-control]{display:none!important}[data-resume-locale]{display:block!important}`}</style></noscript>
  </body></html>;
}
