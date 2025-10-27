// About page describing the brand story and craftsmanship.
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import images from "@/data/images.json";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Tentang Kami | Scarlet Wine Beauty",
  description: "Kenali filosofi Scarlet Wine Beauty dan proses craftmanship di balik setiap koleksi."
});

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <Badge className="bg-primary/15 text-primary">Tentang Kami</Badge>
        <h1 className="font-heading text-3xl text-dark">Scarlet Wine Beauty</h1>
        <p className="max-w-2xl text-sm text-textDark/70">
          Kami memadukan estetika wine lounge dan kenyamanan ritual kecantikan modern ke dalam setiap
          palet, tekstur, dan aroma. Koleksi kami dirancang untuk menghadirkan nuansa mewah tanpa
          meninggalkan sentuhan personal.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 text-sm leading-relaxed text-textDark/80">
          <h2 className="font-heading text-2xl text-dark">Filosofi Warna</h2>
          <p>
            Scarlet Wine memadukan spektrum merah, burgundy, dan blush yang diadaptasi dari dunia anggur.
            Kami percaya warna adalah bahasa emosi. Melalui kurasi shade yang tematik, kami ingin menumbuhkan
            rasa percaya diri dalam setiap kesempatan.
          </p>
          <p>
            Produk dibuat dalam batch kecil untuk menjaga konsistensi pigmentasi. Kami bekerja dengan formulasi
            vegan-friendly dan memastikan kenyamanan di kulit tropis.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <SafeImage
            src={images.textures[0]}
            alt="Tekstur Scarlet Wine"
            width={900}
            height={600}
            className="h-full max-h-[400px] w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl">
          <SafeImage
            src={images.textures[1]}
            alt="Studio Scarlet Wine"
            width={900}
            height={600}
            className="h-full max-h-[400px] w-full object-cover"
          />
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-textDark/80">
          <h2 className="font-heading text-2xl text-dark">Ruang Eksperimen</h2>
          <p>
            Setiap produk melewati uji kenyamanan melalui komunitas internal kami. Insight yang kami dapatkan
            menjadi inspirasi utama dalam menentukan form factor, kemasan, hingga aroma produk.
          </p>
          <p>
            Scarlet Wine Beauty adalah surat cinta untuk perempuan yang menikmati ritme slow luxury. Kami hadir
            untuk menemani dari riasan harian, sesi foto editorial, sampai perayaan intim.
          </p>
        </div>
      </section>
    </div>
  );
}
