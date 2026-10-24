import { siteEn } from "@/content/site.en";
import { RootDocument, buildMetadata } from "@/lib/document";
import "../../globals.css";

export { viewport } from "@/lib/document";
export const metadata = buildMetadata(siteEn);

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument site={siteEn}>{children}</RootDocument>;
}
