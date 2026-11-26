/* =====================================================================
   TEST SAVOLLARI BAZASI
   ---------------------------------------------------------------------
   DIQQAT: bu yerdagi savollar NAMUNAVIY mashq savollari (rasmiy baza emas).
   Rasmiy savollarni shu fayldagi QUESTIONS massiviga quyidagi formatda qo'shing:

   { topic: "Mavzu nomi",
     q: "Savol matni",
     img: "testrasmlar/belgi1.png",        // ixtiyoriy (rasm bo'lmasa o'chirib tashlang)
     a: ["Variant 1", "Variant 2", "Variant 3"],
     c: 0,                                  // to'g'ri javob raqami (0 dan boshlanadi)
     e: "Izoh (ixtiyoriy)" }
   ===================================================================== */

const TEST_SETTINGS = {
  examCount: 20,     // imtihon rejimidagi savollar soni
  examMinutes: 25,   // vaqt (daqiqa)
  maxMistakes: 2     // ruxsat etilgan xatolar soni
};

const QUESTIONS = [
  /* ---- Umumiy qoidalar ---- */
  { topic: "Umumiy qoidalar", q: "Haydovchi yo'lga chiqishdan oldin nimani tekshirishi shart?",
    a: ["Transport vositasining texnik holatini", "Faqat yoqilg'i narxini", "Faqat shinalar rangini"], c: 0,
    e: "Haydovchi texnik jihatdan nosoz transport vositasida yo'lga chiqmasligi kerak." },
  { topic: "Umumiy qoidalar", q: "Haydovchilik guvohnomasi bo'lmagan shaxs transport vositasini boshqarishi mumkinmi?",
    a: ["Yo'q, mumkin emas", "Ha, kunduzi mumkin", "Ha, shahar tashqarisida mumkin"], c: 0 },
  { topic: "Umumiy qoidalar", q: "Mast holatda transport vositasini boshqarish...",
    a: ["Qat'iyan taqiqlanadi", "Kam miqdorda ruxsat etiladi", "Faqat kechasi taqiqlanadi"], c: 0 },
  { topic: "Umumiy qoidalar", q: "Haydash vaqtida telefonni qo'lda ushlab gaplashish...",
    a: ["Taqiqlanadi", "Faqat shaharda taqiqlanadi", "Hech qanday cheklov yo'q"], c: 0,
    e: "Telefon haydovchining diqqatini yo'ldan chalg'itadi." },
  { topic: "Umumiy qoidalar", q: "Haydovchi o'zi bilan qaysi hujjatni olib yurishi shart?",
    a: ["Haydovchilik guvohnomasini va transport vositasiga oid hujjatlarni", "Faqat pasport nusxasini", "Hech qanday hujjat shart emas"], c: 0 },

  /* ---- Svetofor va tartibga solish ---- */
  { topic: "Svetofor va tartibga solish", q: "Svetoforning qizil signali yonganda...",
    a: ["Harakatlanish taqiqlanadi", "Ehtiyotkorlik bilan o'tish mumkin", "Faqat o'ngga burilish mumkin emas"], c: 0 },
  { topic: "Svetofor va tartibga solish", q: "Sariq signal yonganda haydovchi qanday harakat qiladi?",
    a: ["To'xtash chizig'i oldida to'xtaydi; agar keskin tormozlamasdan to'xtash imkonsiz bo'lsa, harakatni davom ettiradi", "Tezlikni oshirib o'tib ketadi", "Hech narsa o'zgarmaydi"], c: 0 },
  { topic: "Svetofor va tartibga solish", q: "Svetofor ishlamayotgan bo'lsa, haydovchi nimaga amal qiladi?",
    a: ["Yo'l belgilari va qoidalar talabiga", "Faqat o'zi xohlagan tarzda harakatlanadi", "Boshqa haydovchilar ortidan ketaveradi"], c: 0 },
  { topic: "Svetofor va tartibga solish", q: "Svetofor signali va tartibga soluvchining ko'rsatmasi bir-biriga zid bo'lsa, kimga bo'ysunish kerak?",
    a: ["Tartibga soluvchiga", "Svetoforga", "Yo'l belgisiga"], c: 0 },
  { topic: "Svetofor va tartibga solish", q: "Yashil signal yonganda haydovchi...",
    a: ["Harakatni davom ettirishi mumkin, lekin qoidalarga rioya qilishi shart", "Hamma narsaga yo'l bermasdan o'tadi", "Albatta to'xtashi kerak"], c: 0 },

  /* ---- Yo'l belgilari ---- */
  { topic: "Yo'l belgilari", q: "\"STOP\" (sakkizburchak, qizil) belgisi nimani bildiradi?",
    a: ["To'xtash chizig'i oldida to'liq to'xtash shart", "Tezlikni biroz kamaytirish kifoya", "Faqat piyodalarga tegishli"], c: 0 },
  { topic: "Yo'l belgilari", q: "\"Yo'l bering\" (pastga qaragan uchburchak) belgisi talabi qanday?",
    a: ["Kesishuvchi yo'ldagi transport vositalariga yo'l berish", "Albatta to'xtab turish", "Tezlikni oshirish"], c: 0 },
  { topic: "Yo'l belgilari", q: "Qizil hoshiyali uchburchak shaklidagi belgilar qaysi guruhga kiradi?",
    a: ["Ogohlantiruvchi belgilar", "Buyuruvchi belgilar", "Axborot-ishora belgilari"], c: 0 },
  { topic: "Yo'l belgilari", q: "Qizil hoshiyali doira shaklidagi belgilar qaysi guruhga kiradi?",
    a: ["Taqiqlovchi belgilar", "Ogohlantiruvchi belgilar", "Servis belgilari"], c: 0 },
  { topic: "Yo'l belgilari", q: "Ko'k fonli doira shaklidagi belgilar qaysi guruhga kiradi?",
    a: ["Buyuruvchi belgilar", "Taqiqlovchi belgilar", "Ogohlantiruvchi belgilar"], c: 0 },

  /* ---- Manevr va chorrahalar ---- */
  { topic: "Manevr va chorrahalar", q: "Piyodalar o'tish joyida quvib o'tish...",
    a: ["Taqiqlanadi", "Ruxsat etiladi", "Faqat kunduzi ruxsat etiladi"], c: 0 },
  { topic: "Manevr va chorrahalar", q: "Burilish yoki qayta qurilishdan oldin haydovchi nima qilishi kerak?",
    a: ["Burilish ko'rsatkichini oldindan yoqishi", "Signalsiz burilishi", "Tezlikni keskin oshirishi"], c: 0 },
  { topic: "Manevr va chorrahalar", q: "Orqaga harakatlanish haqida qaysi gap to'g'ri?",
    a: ["Xavfsiz bo'lishi va boshqalarga xalaqit bermasligi kerak", "Har doim ruxsat etiladi", "Faqat tungi vaqtda ruxsat etiladi"], c: 0 },
  { topic: "Manevr va chorrahalar", q: "Tartibga solinmagan piyodalar o'tish joyida piyoda o'tishni boshlagan bo'lsa, haydovchi...",
    a: ["Yo'l berishi shart", "Signal berib o'tib ketadi", "Tezlikni oshiradi"], c: 0 },
  { topic: "Manevr va chorrahalar", q: "Teng ahamiyatli yo'llar kesishgan chorrahada kimga yo'l beriladi?",
    a: ["O'ng tomondan kelayotgan transport vositasiga", "Chap tomondan kelayotganiga", "Eng tez kelayotganiga"], c: 0 },

  /* ---- Xavfsizlik ---- */
  { topic: "Xavfsizlik", q: "Xavfsizlik kamarini kim taqishi shart?",
    a: ["Haydovchi va kamar bilan jihozlangan o'rindiqlardagi yo'lovchilar", "Faqat haydovchi", "Faqat shahar tashqarisida haydovchi"], c: 0 },
  { topic: "Xavfsizlik", q: "Bolalarni avtomobilda tashish qanday amalga oshiriladi?",
    a: ["Bola yoshi va bo'yiga mos maxsus ushlab turuvchi qurilma bilan", "Quchoqda ushlab", "Oldingi o'rindiqda xohlagancha"], c: 0 },
  { topic: "Xavfsizlik", q: "Mototsikl haydovchisi nima taqishi shart?",
    a: ["Bog'langan mototsikl dubulg'asini (shlem)", "Faqat ko'zoynak", "Hech narsa shart emas"], c: 0 },
  { topic: "Xavfsizlik", q: "Oldingi transport vositasi bilan masofa qanday bo'lishi kerak?",
    a: ["Xavfsiz, to'xtash uchun yetarli masofa", "Imkon qadar yaqin", "Masofa ahamiyatga ega emas"], c: 0 },
  { topic: "Xavfsizlik", q: "Haydovchi charchagan yoki uyqusirayotgan bo'lsa nima qilishi kerak?",
    a: ["Xavfsiz joyda to'xtab dam olishi", "Radioni baland qo'yib davom etishi", "Tezlikni oshirib tezroq yetib olishi"], c: 0 },

  /* ---- Birinchi yordam va YTH ---- */
  { topic: "Birinchi yordam va YTH", q: "Yo'l-transport hodisasi sodir bo'lsa, haydovchi birinchi navbatda nima qilishi kerak?",
    a: ["To'xtab, avariya signalini yoqishi va avariya belgisini qo'yishi", "Voqea joyidan ketib qolishi", "Hech narsa qilmasligi"], c: 0 },
  { topic: "Birinchi yordam va YTH", q: "Jabrlanuvchidan kuchli qon ketayotgan bo'lsa...",
    a: ["Jarohatga bosuvchi bog'lam qo'yish yoki qon to'xtatuvchi vosita qo'llash kerak", "Jarohatni e'tiborsiz qoldirish", "Faqat suv ichirish"], c: 0 },
  { topic: "Birinchi yordam va YTH", q: "Zarurat bo'lmasa, jabrlanuvchini hodisa joyidan ko'chirish mumkinmi?",
    a: ["Yo'q, jarohat og'irlashishi mumkin", "Ha, albatta darhol", "Faqat mashinaga o'tqazish kerak"], c: 0 },
  { topic: "Birinchi yordam va YTH", q: "Jabrlanuvchi o'zida emas, ammo nafas olayotgan bo'lsa...",
    a: ["Nafas yo'llari ochiq bo'lishi uchun xavfsiz holatda yotqizib, tez yordam chaqirish kerak", "Tik o'tqazib qo'yish kerak", "Ustiga sovuq suv quyish kerak"], c: 0 },
  { topic: "Birinchi yordam va YTH", q: "Transport vositasida nima bo'lishi majburiy?",
    a: ["Dori qutichasi, o't o'chirgich va avariya to'xtash belgisi", "Faqat musiqa tizimi", "Faqat zaxira kalit"], c: 0 }
];
