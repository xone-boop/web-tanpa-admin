// Footer with contact and social information.
import Link from "next/link";
import { site } from "@/config/site";
import { Badge } from "@/components/ui/Badge";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-dark/10 bg-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-heading text-xl text-dark">{site.storeName}</h3>
          <p className="text-sm text-textDark/80">{site.tagline}</p>
          <Badge className="bg-primary/20 text-primary">Scarlet Wine</Badge>
        </div>
        <div className="space-y-3 text-sm text-textDark/80">
          <h4 className="font-semibold text-textDark">Kontak</h4>
          <p>Alamat: {site.address}</p>
          <p>Jam Operasional: {site.businessHours}</p>
          <Link
            href={`https://wa.me/${site.waAdmin}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Admin
          </Link>
        </div>
        <div className="space-y-3 text-sm text-textDark/80">
          <h4 className="font-semibold text-textDark">Sosial</h4>
          <ul className="space-y-2">
            {site.social.instagram && (
              <li>
                <Link href={site.social.instagram} className="hover:text-primary" target="_blank">
                  Instagram
                </Link>
              </li>
            )}
            {site.social.tiktok && (
              <li>
                <Link href={site.social.tiktok} className="hover:text-primary" target="_blank">
                  TikTok
                </Link>
              </li>
            )}
            {site.social.marketplace && (
              <li>
                <Link
                  href={site.social.marketplace}
                  className="hover:text-primary"
                  target="_blank"
                >
                  Marketplace
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="bg-surface py-4 text-center text-xs text-textDark/60">
        © {new Date().getFullYear()} {site.storeName}. All rights reserved.
      </div>
    </footer>
  );
};
