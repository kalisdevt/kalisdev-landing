import { siteEn } from "@/content/site.en";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = siteEn.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage(siteEn);
}
