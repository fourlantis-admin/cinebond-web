import Curtain from "@/components/Hero/Curtain";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Başlangıç Animasyonu */}
      <Curtain />
      {/* İkinci Bölüm: Buraya Sinefillik Puanı gelecek */}
      <section className="h-screen flex items-center justify-center border-t border-zinc-800">
        <h2 className="text-4xl text-white">
          Kaydırmaya devam et, hikaye yeni başlıyor...
        </h2>
      </section>
      <div className="h-[100vh]" /> {/* Ekstra alan */}
    </main>
  );
}
