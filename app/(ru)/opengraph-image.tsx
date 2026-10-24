import { site } from "@/content/site";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = site.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return renderOgImage(site);
}
