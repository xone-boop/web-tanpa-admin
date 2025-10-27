// FAQ page covering common customer questions.
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ | Scarlet Wine Beauty",
  description: "Temukan jawaban atas pertanyaan umum mengenai pengiriman, pembayaran, dan produk."
});

const faqs = [
  {
    question: "Apakah Scarlet Wine menawarkan COD?",
    answer:
      "Saat ini pembayaran dilakukan via WhatsApp dengan admin kami. Kami akan mengarahkan sesuai preferensi transfer atau marketplace."
  },
  {
    question: "Berapa lama pengiriman pesanan?",
    answer:
      "Pesanan diproses 1x24 jam. Pengiriman reguler memakan waktu 2-4 hari kerja, sedangkan same-day tergantung ketersediaan kurir di area Anda."
  },
  {
    question: "Apakah produknya cruelty-free?",
    answer:
      "Ya, formulasi kami tidak diuji pada hewan dan menggunakan bahan-bahan vegan-friendly."
  },
  {
    question: "Bisakah saya request shade khusus?",
    answer:
      "Silakan diskusikan dengan admin kami via WhatsApp. Kami menyiapkan batch terbatas untuk preorder shade eksklusif."
  }
];

export default function FaqPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl text-dark">Pertanyaan Umum</h1>
        <p className="text-sm text-textDark/70">
          Informasi praktis seputar pemesanan, pengiriman, dan kualitas produk Scarlet Wine.
        </p>
      </header>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-3xl border border-dark/10 bg-white/70 p-6 shadow-card"
          >
            <summary className="cursor-pointer list-none font-heading text-lg text-dark">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-textDark/80">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
