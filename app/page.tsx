// Landing page with hero, featured products, and storytelling sections.
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import products from "@/data/products.json";
import images from "@/data/images.json";
import { site } from "@/config/site";

const featuredProducts = products.slice(0, 4);

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge className="bg-primary/15 text-primary">Terlaris</Badge>
            <h2 className="mt-3 font-heading text-3xl text-dark">Sorotan Scarlet Wine</h2>
            <p className="text-sm text-textDark/70">
              Pilihan kurasi dari koleksi kami yang siap menemani momen istimewa Anda.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {images.promo.map((image, index) => (
          <div
            key={image}
            className="relative overflow-hidden rounded-3xl bg-dark text-textLight shadow-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/50 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div className="space-y-3">
                <Badge className="bg-white/20 text-textLight">Promo</Badge>
                <h3 className="font-heading text-2xl">
                  {index === 0 ? "Wine-Toned Lips Week" : "Crimson Indulgence Deals"}
                </h3>
                <p className="text-sm text-textLight/80">
                  {index === 0
                    ? "Eksplorasi varian lip velvet kami dengan harga spesial sepanjang minggu ini."
                    : "Bundling set pilihan dengan potongan harga dan bonus tas mini edisi Scarlet Wine."}
                </p>
              </div>
              <a
                href={`https://wa.me/${site.waAdmin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-max items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-textLight transition hover:bg-[#b23632]"
              >
                Klaim Promo
              </a>
            </div>
            <SafeImage
              src={image}
              alt="Scarlet Wine Promo"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-white/80 p-8 shadow-card">
          <h3 className="font-heading text-2xl text-dark">Kisah Scarlet Wine</h3>
          <p className="mt-4 text-sm leading-relaxed text-textDark/80">
            Terinspirasi dari keindahan warna wine yang kaya, Scarlet Wine Beauty menghadirkan
            rangkaian makeup dengan harmoni tekstur satin, matte, dan glow. Setiap rilis diproduksi
            secara terbatas untuk memastikan kualitas artisan yang istimewa.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-textDark/80">
            Tim kreatif kami mengembangkan formula yang ringan sekaligus tahan lama. Nikmati pengalaman
            makeup yang memanjakan indera—aroma lembut, nuansa warna hangat, dan kemasan elegan.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <SafeImage
            src={images.productFlatlays[1]}
            alt="Koleksi Scarlet Wine"
            width={900}
            height={600}
            className="h-full max-h-[420px] w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
