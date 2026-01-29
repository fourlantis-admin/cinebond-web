// require("dotenv").config(); // .env dosyası kullanıyorsan
// const axios = require("axios");
// const { createClient } = require("@supabase/supabase-js");

// // --- AYARLAR ---
// const TMDB_API_KEY = "883ce757de5a20e5dc28d42e6f7ad709";
// const SUPABASE_URL = "https://eugixvpvqjrowaukbctp.supabase.co";
// // Not: Veri yazmak için "service_role" key kullanmak RLS politikalarını aşmak için daha iyidir.
// // Ancak "anon" key kullanacaksan RLS ayarlarının yazmaya izin verdiğinden emin ol.
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2l4dnB2cWpyb3dhdWtiY3RwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM2NDI0MSwiZXhwIjoyMDgyOTQwMjQxfQ.Jmk_Jx94pAjtDGGy2GMeP2L8vJFDV084Vl8NrYBEZ_U";

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
// const BASE_URL = "https://api.themoviedb.org/3";
// const TARGET_COUNT = 1000; // Her kategori için hedef sayı

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// async function fetchAndSave(endpoint, type, extraParams = {}) {
//   let collected = 0;
//   let page = 1;

//   console.log(`\n🚀 ${type.toUpperCase()} verileri çekiliyor...`);

//   while (collected < TARGET_COUNT) {
//     try {
//       // 1. TMDB'den Veriyi Çek
//       const response = await axios.get(`${BASE_URL}${endpoint}`, {
//         params: {
//           api_key: TMDB_API_KEY,
//           language: "tr-TR",
//           page: page,
//           include_adult: false,
//           ...extraParams,
//         },
//       });

//       const results = response.data.results;

//       if (!results || results.length === 0) {
//         console.log("Veri bitti veya sayfa boş.");
//         break;
//       }

//       // 2. Veriyi Temizle ve Hazırla
//       const rowsToInsert = results
//         .filter((item) => item.poster_path) // Posteri olmayanları atla
//         .map((item) => ({
//           tmdb_id: item.id,
//           title: item.title || item.name, // Filmde title, dizide name döner
//           overview: item.overview,
//           poster_url: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//           rating: item.vote_average,
//           release_date: item.release_date || item.first_air_date || null, // Tarih yoksa null
//           content_type: type,
//         }));

//       if (rowsToInsert.length > 0) {
//         // 3. Supabase'e Toplu Yaz (Upsert: Varsa güncelle, yoksa ekle)
//         const { error } = await supabase
//           .from("contents")
//           .upsert(rowsToInsert, { onConflict: "tmdb_id" }); // tmdb_id çakışırsa güncelle

//         if (error) {
//           console.error("Supabase Hatası:", error.message);
//         } else {
//           collected += rowsToInsert.length;
//           console.log(
//             `✅ Sayfa ${page} işlendi. Toplam: ${collected}/${TARGET_COUNT}`
//           );
//         }
//       }

//       page++;
//       await sleep(250); // API limitine takılmamak için bekle
//     } catch (error) {
//       console.error(`❌ Hata (Sayfa ${page}):`, error.message);
//       // Kritik hata değilse devam et, 404 vs ise döngüyü kırabilirsin
//       if (error.response && error.response.status === 404) break;
//     }
//   }
//   console.log(`🏁 ${type} tamamlandı.`);
// }

// async function start() {
//   // 1. Filmler
//   await fetchAndSave("/movie/popular", "movie");

//   // 2. Diziler
//   await fetchAndSave("/tv/popular", "series");

//   // 3. Animeler (Genre: 16, Country: JP)
//   await fetchAndSave("/discover/tv", "anime", {
//     with_genres: 16,
//     with_original_language: "ja",
//   });
// }

// start();
