import { site } from "@/content/site";
import { RootDocument, buildMetadata } from "@/lib/document";
import "../globals.css";

export { viewport } from "@/lib/document";
export const metadata = buildMetadata(site);

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument site={site}>{children}</RootDocument>;
}
