import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ==================== FAMILY DATA ====================
const people: any = {
  "root": {
    id: "root",
    name: "مصطفي مصطفى علي المقمر",
    nickname: "الجد الأكبر للعائلة",
    note: "الجد الأكبر الموثق لعائلة المقمر. توفي سنة 1949 رحمه الله. وله ذرية كثيرة انتشرت في زفتي والبحيرة وبورسعيد وأسوان ومصر كلها.",
    gender: "male",
    deceased: true,
    spouses: [
      { name: "خضرة", note: "من أوائل زوجاته" },
      { name: "السيدة محمد بدر الدين", note: "زوجة قبل مسعدة شعلان" },
      { name: "الحاجة مسعدة العشماوي شعلان", note: "من نهطاي - آخر زوجاته - توفيت 1995" }
    ],
    children: ["ahmed-mostafa", "mohamed-mostafa", "ibrahim-mostafa", "anisa-mostafa", "abdelaziz-mostafa", "zeinab-mostafa", "abdelmonem-mostafa", "mahmoud-mostafa", "abouzeid-mostafa", "saeed-mostafa", "abdelmonem-older", "ibrahim-bonn"]
  },

  "ahmed-mostafa": {
    id: "ahmed-mostafa",
    name: "الحاج أحمد مصطفى المقمر",
    nickname: "الابن الأكبر",
    gender: "male", deceased: true, parent: "root",
    note: "الابن الأكبر للجد مصطفى. صاحب أكبر ذرية في زفتي. كان مقر العائلة في بيته وبيت ابنه الحاج عبد العظيم.",
    spouses: [
      { name: "الحاجة هانم عبد السلام درويش", note: "بنت خاله - من بورسعيد - توفيت صغيرة" },
      { name: "الحاجة وهيبة", note: "قريبته من ناحية والدته - تزوجها بعد وفاة الأولى" }
    ],
    children: ["abdelazeem-ahmed", "mohamed-ahmed", "fatma-ahmed", "elarby-ahmed", "ahmed-ahmed-mostafa", "nadya-ahmed", "mosaad-ahmed", "nabil-ahmed"]
  },
  "mohamed-mostafa": {
    id: "mohamed-mostafa", name: "الحاج محمد مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    children: ["ibrahim-mohamed", "abdelfattah-mohamed", "mohamed-mohamed"]
  },
  "ibrahim-mostafa": {
    id: "ibrahim-mostafa",
    name: "إبراهيم مصطفى المقمر",
    nickname: "الدسوقي",
    gender: "male",
    deceased: true,
    parent: "root",
    motherName: "السيدة محمد بدر الدين",
    note: "كان معروف بلقب الدسوقي",
    spouses: [
      { name: "فتحية العشماوي شعلان" },
      { name: "سنية عبد الغفار الشبكي" }
    ],
    children:["mostafa-ibrahem","sabry-ibrahim","sayeda-ibrahim"]
  },
  "sabry-ibrahim": {
    id: "sabry-ibrahim",
    name: "صبري إبراهيم مصطفى المقمر",
    gender: "male",
    parent: "ibrahim-mostafa",
    note: "مقيم بزفتي",
    children: ["ayman-sabry","asmaa-sabry","ahmed-sabry","amira-sabry","esraa-sabry"]
  },

  "ayman-sabry": { id: "ayman-sabry", name: "أيمن صبري", gender: "male", parent: "sabry-ibrahim" },
  "asmaa-sabry": { id: "asmaa-sabry", name: "أسماء صبري", gender: "female", parent: "sabry-ibrahim" },
  "ahmed-sabry": { id: "ahmed-sabry", name: "أحمد صبري", gender: "male", parent: "sabry-ibrahim" },
  "amira-sabry": { id: "amira-sabry", name: "أميرة صبري", gender: "female", parent: "sabry-ibrahim" },
  "esraa-sabry": { id: "esraa-sabry", name: "إسراء صبري", gender: "female", parent: "sabry-ibrahim" },

  "sayeda-ibrahim": {
    id: "sayeda-ibrahim",
    name: "السيدة إبراهيم مصطفى المقمر",
    gender: "female",
    parent: "ibrahim-mostafa",
    note: "مقيمة بدمنهور الوحش"
  },

  "anisa-mostafa": {
    id: "anisa-mostafa", name: "الحاجة أنيسة مصطفى المقمر",
    gender: "female", deceased: true, parent: "root",
    motherName: "السيدة محمد بدر الدين",
    spouses: [{ name: "الحاج أبو العزم السباك" }]
  },
  "abdelaziz-mostafa": {
    id: "abdelaziz-mostafa", name: "الحاج عبد العزيز مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    motherName: "مسعدة شعلان",
    note: "ضابط جيش. توفي 18 أبريل 2012. هو من كتب شجرة العائلة بخط يده رحمه الله.",
    spouses: [
      { name: "الحاجة عزيزة", note: "الزوجة الأولى" },
      { name: "الحاجة ورد", note: "الزوجة الثانية" }
    ],
    children: ["magdy-abdelaziz", "mamdouh-abdelaziz", "howaida-abdelaziz", "hala-abdelaziz", "hanaa-abdelaziz", "heba-abdelaziz", "khaled-abdelaziz", "haytham-abdelaziz", "iman-abdelaziz"]
  },
  "zeinab-mostafa": {
    id: "zeinab-mostafa", name: "الحاجة زينب مصطفى المقمر",
    gender: "female", deceased: true, parent: "root",
    motherName: "مسعدة شعلان",
    children: ["magdy-zeinab", "emad-zeinab", "hamdy-zeinab", "wafaa-zeinab", "iman-zeinab", "aida-zeinab"]
  },
  "abdelmonem-mostafa": {
    id: "abdelmonem-mostafa", name: "د. عبد المنعم مصطفى المقمر", nickname: "آخر العنقود",
    gender: "male", deceased: true, parent: "root",
    motherName: "مسعدة شعلان",
    note: "مستشار المواد العلمية لدول مجلس التعاون الخليجي. كان قيمة وقامة. توفي 6 مايو 2018.",
    spouses: [
      { name: "الحاجة وفاء كامل عمار", note: "من الفيوم - توفيت 2007" },
      { name: "الحاجة جميلة كامل أبو عباس", note: "لبنانية - تزوجها بعد وفاة الأولى" }
    ],
    children: ["ghada-abdelmonem", "lama-abdelmonem", "haydi-abdelmonem"]
  },
  "mahmoud-mostafa": {
    id: "mahmoud-mostafa", name: "محمود مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    motherName: "مسعدة شعلان",
    note: "توفي وهو شاب قبل أن يتزوج"
  },
  "abouzeid-mostafa": {
    id: "abouzeid-mostafa", name: "الحاج أبو زيد مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    note: "كان عنده وكالة كوكاكولا ومتعهد توزيع الجرايد أمام نادي المعلمين بزفتي",
    children: ["mostafa-abouzeid", "kamal-abouzeid", "ahmed-abouzeid"]
  },
  "saeed-mostafa": {
    id: "saeed-mostafa", name: "السعيد مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    note: "كانت له معدية دقدق عند الاتحاد الاشتراكي"
  },
  // "abdelmonem-older": {
  //   id: "abdelmonem-older", name: "عبد المنعم مصطفى المقمر (الأكبر)",
  //   gender: "male", deceased: true, parent: "root",
  //   note: "كان شغال في الكهرباء - في الحي البحري"
  // },
  "ibrahim-bonn": {
    id: "ibrahim-bonn", name: "إبراهيم مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    note: "كان تاجر بن في شارع سعد زغلول"
  },

  "abdelazeem-ahmed": {
    id: "abdelazeem-ahmed",
    name: "الحاج عبد العظيم أحمد المقمر",
    gender: "male",
    deceased: true,
    parent: "ahmed-mostafa",
    motherName: "هانم درويش",
    note: "ولد وعاش وتوفي في زفتي. كان تاجر كاوتشوك وصاحب محل، ومن أوائل من امتلكوا سيارات نقل مرسيدس في زفتي وميت غمر (ثاني عربية نقل مرسيدس هناك). كان لديه سيارة ملاكي ومكتب بشارع الجيش أمام مسجد عيد (مكان سليمان الجزار حالياً)، وكان لديه تليفون رقم 3565.",
    spouses: [
      { name: "الحاجة نفيسة عبد الوهاب أحمد عامر", note: "من الجعفرية مركز السنطة، وكانت مقيمة في طنطا قبل الزواج، ومن نسل سيدي أبو العزم وله مقام كبير هناك" }
    ],
    children: ["hanaa-abdelazeem","osama-abdelazeem","asmaa-abdelazeem","ahmed-abdelazeem","mostafa-abdelazeem","ebtesam-abdelazeem","rabab-abdelazeem"]
  },
  "mohamed-ahmed": {
    id: "mohamed-ahmed", name: "الحاج محمد أحمد المقمر", nickname: "عميد عائلات المقمر",
    gender: "male", parent: "ahmed-mostafa",
    motherName: "هانم درويش",
    note: "أكبر عميد للعائلة حالياً - ربنا يديم عليه الصحة والعافية",
    children: ["mostafa-mohamed-a", "ahmed-mohamed-a", "enas-mohamed", "iman-mohamed", "mohamed-mohamed-a", "samah-mohamed", "abdelsalam-mohamed", "osama-mohamed", "asmaa-mohamed"]
  },
  "fatma-ahmed": {
    id: "fatma-ahmed", name: "الحاجة فاطمة أحمد المقمر", nickname: "أم حسني",
    gender: "female", parent: "ahmed-mostafa",
    motherName: "هانم درويش",
    note: "البركة كلها - ربنا يمتعها بالصحة والعافية",
    spouses: [{ name: "الحاج فاروق البرماوي", note: "رحمة الله عليه" }],
    children: ["hosny-b", "hassan-b", "howaida-b", "hamdy-b", "suzan-b", "iman-b"]
  },
  "elarby-ahmed": {
    id: "elarby-ahmed", name: "الحاج عبد الحي أحمد المقمر", nickname: "العربي",
    gender: "male", deceased: true, parent: "ahmed-mostafa",
    motherName: "هانم درويش",
    spouses: [{ name: "الحاجة رجاء عبد السلام درويش", note: "بنت عمه - من بورسعيد" }],
    children: ["mohamed-elarby", "abdelsalam-elarby", "amal-elarby", "marwa-elarby"]
  },
  "ahmed-ahmed-mostafa": {
    id: "ahmed-ahmed-mostafa", name: "الحاج أحمد أحمد المقمر",
    gender: "male", deceased: true, parent: "ahmed-mostafa",
    motherName: "وهيبة",
    spouses: [{ name: "الحاجة سميحة" }],
    children: ["mohamed-aa", "emad-aa", "doha-aa", "mosaad-aa", "nabil-aa"]
  },
  "nadya-ahmed": {
    id: "nadya-ahmed", name: "الحاجة نادية أحمد المقمر",
    gender: "female", deceased: true, parent: "ahmed-mostafa",
    motherName: "وهيبة",
    note: "أطيب وأحن واحدة قابلناها - اتعلمنا منها عفوية ورضا وسماحة",
    spouses: [{ name: "محمد قاسم (السباك)", note: "كان متربي في بيت الحاج أحمد من الصغر" }],
    children: ["ibrahim-q", "amal-q", "asmaa-q", "habiba-q"]
  },
  "mosaad-ahmed": {
    id: "mosaad-ahmed", name: "الحاج مسعد أحمد المقمر",
    gender: "male", deceased: false, parent: "ahmed-mostafa",
    motherName: "وهيبة",
    spouses: [{name: "الحاجة ناهد أبوهاشم عليم" }],
    children: ["ahmed-mosaad", "mohamed-mosaad", "amira-mosaad", "abdelrahman-mosaad"]
  },
  "nabil-ahmed": {
    id: "nabil-ahmed", name: "نبيل أحمد المقمر",
    gender: "male", deceased: true, parent: "ahmed-mostafa",
    motherName: "وهيبة",
    note: "توفي 25/5/2001"
  },

  "ibrahim-mohamed": {
    id: "ibrahim-mohamed", name: "إبراهيم محمد المقمر",
    gender: "male", deceased: false, parent: "mohamed-mostafa",
    children: ["mohamed-im", "ahmed-im", "fatma-im", "abdelfattah-im"]
  },
  "abdelfattah-mohamed": {
    id: "abdelfattah-mohamed", name: "الحاج عبد الفتاح محمد المقمر", nickname: "الشيخ عبد الفتاح",
    gender: "male", parent: "mohamed-mostafa",
    children: ["ibrahim-af", "omar-af", "yousef-af"]
  },
  "mohamed-mohamed": {
    id: "mohamed-mohamed", name: "محمد محمد المقمر",
    gender: "male", deceased: true, parent: "mohamed-mostafa"
  },

  "mostafa-ibrahem": {
    id: "mostafa-ibrahem", name: "الحاج مصطفى ابراهيم المقمر",
    gender: "male", deceased: true, parent: "ibrahim-mostafa",
    motherName: "عزيزة",
    note: "كان مقيماً في أسوان - شغل بالسد العالي",
    children: ["khaled-m", "mohamed-m-aswan", "iman-m-aswan", "ashgan-m", "hend-m", "hala-m"]
  },
  "magdy-abdelaziz": {
    id: "magdy-abdelaziz", name: "د. مجدي عبد العزيز المقمر", nickname: "الدكتور مجدي البنا",
    gender: "male", parent: "abdelaziz-mostafa",
    motherName: "عزيزة",
    note: "ابنه الوحيد عبد الرحمن توفي رحمة الله عليه"
  },
  "mamdouh-abdelaziz": { id: "mamdouh-abdelaziz", name: "ممدوح عبد العزيز المقمر", gender: "male", parent: "abdelaziz-mostafa", motherName: "عزيزة" },
  "howaida-abdelaziz": { id: "howaida-abdelaziz", name: "هويدة عبد العزيز المقمر", gender: "female", parent: "abdelaziz-mostafa", motherName: "عزيزة" },
  "hala-abdelaziz": { id: "hala-abdelaziz", name: "هالة عبد العزيز المقمر", gender: "female", parent: "abdelaziz-mostafa", motherName: "عزيزة" },
  "hanaa-abdelaziz": { id: "hanaa-abdelaziz", name: "هناء عبد العزيز المقمر", gender: "female", parent: "abdelaziz-mostafa", motherName: "عزيزة" },
  "heba-abdelaziz": { id: "heba-abdelaziz", name: "هبة عبد العزيز المقمر", gender: "female", parent: "abdelaziz-mostafa", motherName: "ورد" },
  "khaled-abdelaziz": { id: "khaled-abdelaziz", name: "المهندس خالد عبد العزيز المقمر", gender: "male", parent: "abdelaziz-mostafa", motherName: "ورد" },
  "haytham-abdelaziz": { id: "haytham-abdelaziz", name: "المهندس هيثم عبد العزيز المقمر", gender: "male", parent: "abdelaziz-mostafa", motherName: "ورد" },
  "iman-abdelaziz": { id: "iman-abdelaziz", name: "د. إيمان عبد العزيز المقمر", gender: "female", parent: "abdelaziz-mostafa", motherName: "ورد", note: "صاحبة الأوراق الرسمية والشهادات الأصلية للعائلة" },

  "magdy-zeinab": { id: "magdy-zeinab", name: "الأستاذ مجدي البنا", gender: "male", parent: "zeinab-mostafa" },
  "emad-zeinab": { id: "emad-zeinab", name: "عماد", gender: "male", parent: "zeinab-mostafa" },
  "hamdy-zeinab": { id: "hamdy-zeinab", name: "حمدي", gender: "male", parent: "zeinab-mostafa" },
  "wafaa-zeinab": { id: "wafaa-zeinab", name: "وفاء", gender: "female", parent: "zeinab-mostafa" },
  "iman-zeinab": { id: "iman-zeinab", name: "إيمان", gender: "female", parent: "zeinab-mostafa" },
  "aida-zeinab": { id: "aida-zeinab", name: "عايدة", gender: "female", parent: "zeinab-mostafa" },

  "ghada-abdelmonem": { id: "ghada-abdelmonem", name: "غادة عبد المنعم", gender: "female", parent: "abdelmonem-mostafa", motherName: "وفاء كامل عمار" },
  "lama-abdelmonem": {
    id: "lama-abdelmonem", name: "د. لمى عبد المنعم",
    gender: "female", parent: "abdelmonem-mostafa",
    motherName: "وفاء كامل عمار",
    note: "مقيمة في أيرلندا",
    spouses: [{ name: "د. خالد طه", note: "جراح قلوب" }]
  },
  "haydi-abdelmonem": { id: "haydi-abdelmonem", name: "د. هايدي عبد المنعم", gender: "female", parent: "abdelmonem-mostafa", motherName: "وفاء كامل عمار" },

  "mostafa-abouzeid": {
    id: "mostafa-abouzeid", name: "مصطفى أبو زيد المقمر",
    gender: "male", deceased: true, parent: "abouzeid-mostafa",
    children: ["sahar-az", "hala-az", "mahmoud-az", "mervat-az", "ebtesam-az"]
  },
  "kamal-abouzeid": {
    id: "kamal-abouzeid", name: "الأستاذ كمال أبو زيد المقمر",
    gender: "male", parent: "abouzeid-mostafa",
    children: ["wael-kamal"]
  },
  "ahmed-abouzeid": { id: "ahmed-abouzeid", name: "أحمد أبو زيد المقمر", gender: "male", deceased: true, parent: "abouzeid-mostafa", note: "متزوج من سنباط" },

  "ahmed-abdelazeem": {
    id: "ahmed-abdelazeem",
    name: "أحمد عبد العظيم المقمر",
    gender: "male",
    parent: "abdelazeem-ahmed",
    note: "مواليد أكتوبر 1962 - مقيم في زفتي والقاهرة",
    spouses: [{ name: "الحاجة كوثر متولي الأحول", note: "من المحلة" }],
    children: ["nada-ahmed","safaa-ahmed","ahmed2-ahmed","ola-ahmed","farida-ahmed"]
  },
  "hanaa-abdelazeem": {
    id: "hanaa-abdelazeem",
    name: "هانم (هناء) عبد العظيم المقمر",
    gender: "female",
    parent: "abdelazeem-ahmed",
    note: "مواليد يناير 1958 - مقيمة في 6 أكتوبر",
    spouses: [{ name: "المهندس محمد جاد البراوي", note: "من ميت المخلص شرشابة" }],
    children: ["sara-hanaa","ahmed-hanaa","aseel-hanaa"]
  },
  "osama-abdelazeem": {
    id: "osama-abdelazeem",
    name: "محمد (أسامة) عبد العظيم المقمر",
    gender: "male",
    parent: "abdelazeem-ahmed",
    note: "مواليد أبريل 1959 - مقيم في أكتوبر وزفتي",
    spouses: [{ name: "الأستاذة نجوى حسن الموشي" }],
    children: ["fatma-osama","mariam-osama","khaled-osama"]
  },
  "mostafa-abdelazeem": {
    id: "mostafa-abdelazeem",
    name: "مصطفى عبد العظيم المقمر",
    gender: "male",
    deceased: true,
    parent: "abdelazeem-ahmed",
    note: "توفي وهو عمر عام"
  },
  "ebtesam-abdelazeem": {
    id: "ebtesam-abdelazeem",
    name: "ابتسام عبد العظيم المقمر",
    gender: "female",
    parent: "abdelazeem-ahmed",
    note: "مواليد مارس 1970 - مقيمة في أكتوبر",
    spouses: [{ name: "اللواء أحمد عبد الغفور الغنيمي", note: "من ملوي" }],
    children: ["amal-ebtesam","alaa-ebtesam","arwa-ebtesam"]
  },

  "amal-ebtesam": { id: "amal-ebtesam", name: "أمل", gender: "female", parent: "ebtesam-abdelazeem" },
  "alaa-ebtesam": { id: "alaa-ebtesam", name: "آلاء", gender: "female", parent: "ebtesam-abdelazeem" },
  "arwa-ebtesam": { id: "arwa-ebtesam", name: "أروى", gender: "female", parent: "ebtesam-abdelazeem" },
  "asmaa-abdelazeem": {
    id: "asmaa-abdelazeem",
    name: "أسماء عبد العظيم المقمر",
    gender: "female",
    parent: "abdelazeem-ahmed",
    note: "مواليد يناير 1961 - مواليد سمنود محافظة الغربية - مقيمة في العبور",
    spouses: [{ name: "الحاج ناجي محمد المصري", note: "تاجر زجاج وصاحب مصنع ديكورات ومرايا" }],
    children: ["eman-asmaa","mohamed-asmaa","mostafa-asmaa","fatma-asmaa"]
  },
  "rabab-abdelazeem": {
    id: "rabab-abdelazeem",
    name: "رباب عبد العظيم المقمر",
    gender: "female",
    parent: "abdelazeem-ahmed",
    note: "مواليد ديسمبر 1972 - مقيمة في زفتي",
    spouses: [{ name: "الحاج أيمن الشيخ", note: "من كفر نواي زفتي - مقاول عقارات - متوفى" }],
    children: ["ahmed-rabab","mohamed-rabab","mostafa-rabab"]
  },

  "ahmed-rabab": { id: "ahmed-rabab", name: "أحمد", gender: "male", parent: "rabab-abdelazeem",fatherName: "الحاج أيمن الشيخ" },
  "mohamed-rabab": { id: "mohamed-rabab", name: "محمد", gender: "male", parent: "rabab-abdelazeem", deceased: true, note: "توفاه الله",fatherName: "الحاج أيمن الشيخ" },
  "mostafa-rabab": { id: "mostafa-rabab", name: "مصطفى", gender: "male", parent: "rabab-abdelazeem", deceased: true, note: "توفاه الله",fatherName: "الحاج أيمن الشيخ" },

  "sara-hanaa": { id: "sara-hanaa", name: "الدكتورة سارة", gender: "female", parent: "hanaa-abdelazeem", fatherName: "المهندس محمد جاد البراوي" },
  "ahmed-hanaa": { id: "ahmed-hanaa", name: "الدكتور أحمد", gender: "male", parent: "hanaa-abdelazeem", fatherName: "المهندس محمد جاد البراوي" },
  "aseel-hanaa": { id: "aseel-hanaa", name: "الأستاذة أسيل", gender: "female", parent: "hanaa-abdelazeem", fatherName: "المهندس محمد جاد البراوي" },

  "fatma-osama": { id: "fatma-osama", name: "الأستاذة فاطمة", gender: "female", parent: "osama-abdelazeem" ,motherName: "نجوى حسن الموشي"},
  "mariam-osama": { id: "mariam-osama", name: "الأستاذة مريم", gender: "female", parent: "osama-abdelazeem",motherName: "نجوى حسن الموشي" },
  "khaled-osama": { id: "khaled-osama", name: "الأستاذ خالد", gender: "male", parent: "osama-abdelazeem",motherName: "نجوى حسن الموشي" },

  "eman-asmaa": { id: "eman-asmaa", name: "الدكتورة إيمان", gender: "female", parent: "asmaa-abdelazeem",fatherName: "الحاج ناجي المصري" },
  "mohamed-asmaa": { id: "mohamed-asmaa", name: "المهندس محمد", gender: "male", parent: "asmaa-abdelazeem",fatherName: "الحاج ناجي المصري" },
  "mostafa-asmaa": { id: "mostafa-asmaa", name: "الأستاذ مصطفى", gender: "male", parent: "asmaa-abdelazeem",fatherName: "الحاج ناجي المصري" },
  "fatma-asmaa": { id: "fatma-asmaa", name: "الأستاذة فاطمة", gender: "female", parent: "asmaa-abdelazeem",fatherName: "الحاج ناجي المصري" },

  "nada-ahmed": { id: "nada-ahmed", name: "ندى", gender: "female", parent: "ahmed-abdelazeem",motherName: "كوثر متولي الأحول" },
  "safaa-ahmed": { id: "safaa-ahmed", name: "صفاء", gender: "female", parent: "ahmed-abdelazeem",motherName: "كوثر متولي الأحول" },
  "ahmed2-ahmed": { id: "ahmed2-ahmed", name: "أحمد", gender: "male", parent: "ahmed-abdelazeem",motherName: "كوثر متولي الأحول" },
  "ola-ahmed": { id: "ola-ahmed", name: "علا", gender: "female", parent: "ahmed-abdelazeem",motherName: "كوثر متولي الأحول" },
  "farida-ahmed": { id: "farida-ahmed", name: "فريدة", gender: "female", parent: "ahmed-abdelazeem",motherName: "كوثر متولي الأحول" },

  "mostafa-mohamed-a": { id: "mostafa-mohamed-a", name: "مصطفى محمد المقمر", gender: "male", deceased: true, parent: "mohamed-ahmed" },
  "ahmed-mohamed-a": { id: "ahmed-mohamed-a", name: "أحمد محمد المقمر", gender: "male",deceased: true, parent: "mohamed-ahmed" },
  "enas-mohamed": { id: "enas-mohamed", name: "إيناس محمد المقمر", gender: "female", parent: "mohamed-ahmed" },
  "iman-mohamed": { id: "iman-mohamed", name: "إيمان محمد المقمر", gender: "female", parent: "mohamed-ahmed", spouses: [{ name: "سعد درويش", note: "من بورسعيد" }] },
  "mohamed-mohamed-a": { id: "mohamed-mohamed-a", name: "محمد محمد المقمر", gender: "male", parent: "mohamed-ahmed" },
  "samah-mohamed": { id: "samah-mohamed", name: "سماح محمد المقمر", gender: "female", parent: "mohamed-ahmed" },
  "abdelsalam-mohamed": { id: "abdelsalam-mohamed", name: "عبد السلام محمد المقمر", nickname: "عبده", gender: "male", parent: "mohamed-ahmed" },
  "osama-mohamed": { id: "osama-mohamed", name: "أسامة محمد المقمر", gender: "male", parent: "mohamed-ahmed" },
  "asmaa-mohamed": { id: "asmaa-mohamed", name: "أسماء محمد المقمر", gender: "female", parent: "mohamed-ahmed" },

  "hosny-b": { id: "hosny-b", name: "الأستاذ حسني البرماوي", gender: "male", parent: "fatma-ahmed" },
  "hassan-b": { id: "hassan-b", name: "حسن البرماوي", gender: "male", parent: "fatma-ahmed" },
  "howaida-b": { id: "howaida-b", name: "هويدا البرماوي", gender: "female", parent: "fatma-ahmed" },
  "hamdy-b": { id: "hamdy-b", name: "حمدي البرماوي", gender: "male", parent: "fatma-ahmed", note: "والد فاطمة البرماوي" },
  "suzan-b": { id: "suzan-b", name: "سوزان البرماوي", nickname: "زيزي", gender: "female", parent: "fatma-ahmed" },
  "iman-b": { id: "iman-b", name: "إيمان البرماوي", gender: "female", parent: "fatma-ahmed" },

  "mohamed-elarby": { id: "mohamed-elarby", name: "محمد العربي المقمر", gender: "male", parent: "elarby-ahmed" },
  "abdelsalam-elarby": { id: "abdelsalam-elarby", name: "عبد السلام العربي المقمر", gender: "male", parent: "elarby-ahmed" },
  "amal-elarby": { id: "amal-elarby", name: "أمل العربي المقمر", gender: "female", parent: "elarby-ahmed" },
  "marwa-elarby": { id: "marwa-elarby", name: "الأستاذة مروة العربي المقمر", gender: "female", parent: "elarby-ahmed", note: "مقيمة في بورسعيد" },

  "mohamed-aa": { id: "mohamed-aa", name: "محمد أحمد", gender: "male", parent: "ahmed-ahmed-mostafa" },
  "emad-aa": { id: "emad-aa", name: "عماد أحمد", gender: "male", parent: "ahmed-ahmed-mostafa" },
  "doha-aa": { id: "doha-aa", name: "ضحى أحمد", gender: "female", parent: "ahmed-ahmed-mostafa" },
  "mosaad-aa": { id: "mosaad-aa", name: "مسعد أحمد", gender: "male", parent: "ahmed-ahmed-mostafa" },
  "nabil-aa": { id: "nabil-aa", name: "نبيل أحمد", gender: "male", parent: "ahmed-ahmed-mostafa" },

  "ibrahim-q": { id: "ibrahim-q", name: "إبراهيم قاسم", gender: "male", parent: "nadya-ahmed" },
  "amal-q": { id: "amal-q", name: "د. أمل محمد قاسم", gender: "female", parent: "nadya-ahmed" },
  "asmaa-q": { id: "asmaa-q", name: "أسماء قاسم", gender: "female", parent: "nadya-ahmed" },
  "habiba-q": { id: "habiba-q", name: "حبيبة قاسم", gender: "female", parent: "nadya-ahmed" },

  "ahmed-mosaad": { id: "ahmed-mosaad", name: "الأستاذ أحمد مسعد المقمر", gender: "male", parent: "mosaad-ahmed",    spouses: [
      { name: "هالة محمد أحمد سرية" },
    ], children: ["malak-ahmed", "abdallah-ahmed", "hazem-ahmed","yehia-ahmed"] ,motherName:"ناهد أبوهاشم  عليم",},
  "malak-ahmed": { id: "malak-ahmed", name: "ملك أحمد مسعد المقمر", gender: "female", parent: "ahmed-mosaad",motherName: "هالة محمد أحمد سرية" },
  "abdallah-ahmed": { id: "abdallah-ahmed", name: "عبدالله أحمد مسعد المقمر", gender: "male", parent: "ahmed-mosaad" ,motherName: "هالة محمد أحمد سرية"},
  "hazem-ahmed": { id: "hazem-ahmed", name: "حازم أحمد مسعد المقمر", gender: "male", parent: "ahmed-mosaad",motherName: "هالة محمد أحمد سرية" },
  "yehia-ahmed": { id: "yehia-ahmed", name: "يحيى أحمد مسعد المقمر", gender: "male", parent: "ahmed-mosaad",motherName: "هالة محمد أحمد سرية" },
  "mohamed-mosaad": { id: "mohamed-mosaad", name: "محمد مسعد المقمر", gender: "male", parent: "mosaad-ahmed",motherName:"ناهد أبوهاشم  عليم",spouses: [{ name: "سلوي صالح" }] ,children: ["mazen-mohamed","maged-mohamed"] },
  "mazen-mohamed": { id: "mazen-mohamed", name: " مازن محمد مسعد المقمر", gender: "male", parent: "mohamed-mosaad" },
  "maged-mohamed": { id: "maged-mohamed", name: "ماجد محمد مسعد المقمر",motherName:"سلوي صالح", gender: "male", parent: "mohamed-mosaad" },
  "amira-mosaad": { id: "amira-mosaad", name: "أميرة مسعد المقمر", motherName:"ناهد أبوهاشم  عليم",gender: "female", parent: "mosaad-ahmed",spouses: [{ name: "أحمد الحبشي" }] },
  "abdelrahman-mosaad": { id: "abdelrahman-mosaad",motherName:"ناهد أبوهاشم  عليم", name: "عبد الرحمن مسعد المقمر", gender: "male", parent: "mosaad-ahmed",spouses:[{name:"شروق أحمد الديب"}] },

  "mohamed-im": { id: "mohamed-im", name: "محمد إبراهيم", gender: "male", parent: "ibrahim-mohamed" },
  "ahmed-im": { id: "ahmed-im", name: "أحمد إبراهيم", gender: "male", parent: "ibrahim-mohamed" },
  "fatma-im": { id: "fatma-im", name: "فاطمة إبراهيم", gender: "female", parent: "ibrahim-mohamed" },
  "abdelfattah-im": { id: "abdelfattah-im", name: "عبد الفتاح إبراهيم", gender: "male", parent: "ibrahim-mohamed" },

  "ibrahim-af": { id: "ibrahim-af", name: "إبراهيم عبد الفتاح المقمر", nickname: "عمور", gender: "male", parent: "abdelfattah-mohamed" },
  "omar-af": { id: "omar-af", name: "عمر عبد الفتاح المقمر", gender: "male", parent: "abdelfattah-mohamed" },
  "yousef-af": { id: "yousef-af", name: "يوسف عبد الفتاح المقمر", gender: "male", parent: "abdelfattah-mohamed" },

  "khaled-m": { id: "khaled-m", name: "خالد مصطفى المقمر", gender: "male", parent: "mostafa-ibrahem", note: "محاسب بالمقاولين العرب باسوان" },
  "mohamed-m-aswan": { id: "mohamed-m-aswan", name: "محمد مصطفى المقمر", gender: "male", parent: "mostafa-ibrahem" },
  "iman-m-aswan": { id: "iman-m-aswan", name: "الأستاذة إيمان مصطفى المقمر", gender: "female", parent: "mostafa-ibrahem", note: "كانت مديرة مدرسة في أسوان" },
  "ashgan-m": { id: "ashgan-m", name: "أشجان مصطفى المقمر", gender: "female", parent: "mostafa-ibrahem" },
  "hend-m": { id: "hend-m", name: "هند مصطفى المقمر", gender: "female", parent: "mostafa-ibrahem" },
  "hala-m": { id: "hala-m", name: "هالة مصطفى المقمر", gender: "female", parent: "mostafa-ibrahem" },

  "sahar-az": { id: "sahar-az", name: "سحر", gender: "female", parent: "mostafa-abouzeid" },
  "hala-az": { id: "hala-az", name: "هالة", gender: "female", parent: "mostafa-abouzeid" },
  "mahmoud-az": { id: "mahmoud-az", name: "محمود", gender: "male", parent: "mostafa-abouzeid" },
  "mervat-az": { id: "mervat-az", name: "مرفت", gender: "female", parent: "mostafa-abouzeid" },
  "ebtesam-az": { id: "ebtesam-az", name: "ابتسام", gender: "female", deceased: false, parent: "mostafa-abouzeid", spouses: [{ name: "الأستاذ مجدي الكفراوي" }] },
  "wael-kamal": { id: "wael-kamal", name: "الأستاذ وائل كمال المقمر", gender: "male", parent: "kamal-abouzeid" },

  "bohaira-root": {
    id: "bohaira-root", name: "فرع البحيرة", nickname: "أبو حمص وإدكو ودمنهور",
    gender: "male",
    note: "فرع العائلة في محافظة البحيرة. كان الأصل أن 6 إخوة جاءوا من أبو حمص لزفتي حسب رواية الحاج محمد السعيد.",
    children: ["rajab-mohamed", "mohamed-yousef", "mohamed-elsaeed", "rajab-saad"]
  },
  "rajab-mohamed": {
    id: "rajab-mohamed", name: "الحاج رجب محمد المقمر",
    gender: "male", parent: "bohaira-root",
    note: "موظف الأوقاف السابق - من أبو حمص - أخو الشيخ محمود - أهل الزنط المحترمين"
  },
  "mohamed-yousef": {
    id: "mohamed-yousef", name: "الحاج محمد يوسف المقمر",
    gender: "male", parent: "bohaira-root",
    children: ["ahmed-mohamed-yousef"]
  },
  "ahmed-mohamed-yousef": {
    id: "ahmed-mohamed-yousef", name: "أحمد محمد يوسف المقمر",
    gender: "male", parent: "mohamed-yousef",
    note: "من أبو حمص البحيرة"
  },
  "mohamed-elsaeed": {
    id: "mohamed-elsaeed", name: "الحاج محمد السعيد العزب المقمر",
    gender: "male", parent: "bohaira-root",
    note: "كان يروي أنهم تقريباً 6 إخوة جاءوا من أبو حمص لزفتي"
  },
  "rajab-saad": {
    id: "rajab-saad", name: "الحاج رجب سعد المقمر",
    gender: "male", parent: "bohaira-root"
  }
};

// ==================== HELPERS ====================
const TITLES = ['الحاج', 'الحاجة', 'الأستاذ', 'الأستاذة', 'الدكتور', 'الدكتورة', 'د.', 'م.', 'المهندس'];

function getInitials(name: string): string {
  if (!name) return '';
  let parts = name.trim().split(/\s+/);
  for (const title of TITLES) {
    if (parts[0] === title || name.startsWith(title + ' ')) {
      parts = name.replace(title + ' ', '').trim().split(/\s+/);
      break;
    }
  }
  return parts[0] ? parts[0][0] : name[0];
}

function shortenName(name: string): string {
  if (!name) return '';
  let clean = name;
  for (const t of TITLES) {
    if (clean.startsWith(t + ' ')) { clean = clean.substring(t.length + 1); break; }
  }
  const parts = clean.split(/\s+/);
  return parts.slice(0, 2).join(' ');
}

function getAllPeople(): any[] {
  return Object.values(people).filter((p: any) => p && p.name);
}

// ==================== LAYOUT ENGINE ====================
interface NodeLayout {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const NODE_W = 120;
const NODE_H = 100;
const H_GAP = 20;
const V_GAP = 80;

function computeSubtreeWidth(id: string, expandedNodes: Set<string>): number {
  const node = people[id];
  if (!node) return NODE_W;
  
  if (!expandedNodes.has(id)) return NODE_W;
  
  const children = (node.children || []).filter((cid: string) => people[cid]);
  if (children.length === 0) return NODE_W;
  const childrenWidth = children.reduce((sum: number, cid: string) => sum + computeSubtreeWidth(cid, expandedNodes), 0)
    + (children.length - 1) * H_GAP;
  return Math.max(NODE_W, childrenWidth);
}

function layoutTree(id: string, x: number, y: number, layouts: NodeLayout[], expandedNodes: Set<string>): void {
  const node = people[id];
  if (!node) return;
  
  layouts.push({ id, x, y, width: NODE_W, height: NODE_H });

  if (!expandedNodes.has(id)) return;
  
  const children = (node.children || []).filter((cid: string) => people[cid]);
  if (children.length === 0) return;

  const totalWidth = children.reduce((sum: number, cid: string) => sum + computeSubtreeWidth(cid, expandedNodes), 0)
    + (children.length - 1) * H_GAP;

  let childX = x - totalWidth / 2;
  const childY = y + NODE_H + V_GAP;

  for (const cid of children) {
    const cw = computeSubtreeWidth(cid, expandedNodes);
    layoutTree(cid, childX + cw / 2, childY, layouts, expandedNodes);
    childX += cw + H_GAP;
  }
}

// ==================== SVG TREE ====================
function TreeSVG({ rootId, selectedId, onSelect, expandedNodes, onToggleExpand }: {
  rootId: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  expandedNodes: Set<string>;
  onToggleExpand: (id: string) => void;
}) {
  const layouts = useMemo(() => {
    const result: NodeLayout[] = [];
    layoutTree(rootId, 0, 0, result, expandedNodes);
    return result;
  }, [rootId, expandedNodes]);

  const layoutMap = useMemo(() => {
    const m: Record<string, NodeLayout> = {};
    layouts.forEach(l => { m[l.id] = l; });
    return m;
  }, [layouts]);

  const bounds = useMemo(() => {
    if (layouts.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const xs = layouts.map(l => l.x);
    const ys = layouts.map(l => l.y);
    return {
      minX: Math.min(...xs) - NODE_W / 2 - 30,
      maxX: Math.max(...xs) + NODE_W / 2 + 30,
      minY: Math.min(...ys) - 30,
      maxY: Math.max(...ys) + NODE_H + 30,
    };
  }, [layouts]);

  const svgWidth = bounds.maxX - bounds.minX;
  const svgHeight = bounds.maxY - bounds.minY;

  // Build connector lines
  const lines: React.ReactNode[] = [];
  layouts.forEach(layout => {
    const node = people[layout.id];
    if (!node || !node.children) return;
    const children = (node.children as string[]).filter(cid => layoutMap[cid]);
    if (children.length === 0) return;

    const parentCX = layout.x - bounds.minX;
    const parentCY = layout.y - bounds.minY + NODE_H;
    const midY = parentCY + V_GAP / 2;

    lines.push(
      <line
        key={`v-${layout.id}`}
        x1={parentCX} y1={parentCY}
        x2={parentCX} y2={midY}
        stroke="#e0e0e0" strokeWidth={2} strokeOpacity={0.8}
      />
    );

    if (children.length > 1) {
      const firstChild = layoutMap[children[0]];
      const lastChild = layoutMap[children[children.length - 1]];
      const hLineX1 = firstChild.x - bounds.minX;
      const hLineX2 = lastChild.x - bounds.minX;
      lines.push(
        <line
          key={`h-${layout.id}`}
          x1={hLineX1} y1={midY}
          x2={hLineX2} y2={midY}
          stroke="#e0e0e0" strokeWidth={2} strokeOpacity={0.8}
        />
      );
    }

    children.forEach(cid => {
      const childLayout = layoutMap[cid];
      if (!childLayout) return;
      const childCX = childLayout.x - bounds.minX;
      const childCY = childLayout.y - bounds.minY;
      lines.push(
        <line
          key={`c-${cid}`}
          x1={childCX} y1={midY}
          x2={childCX} y2={childCY}
          stroke="#e0e0e0" strokeWidth={2} strokeOpacity={0.8}
        />
      );
    });
  });

  const rootLayout = layoutMap[rootId];
  const rootCX = rootLayout ? rootLayout.x - bounds.minX : svgWidth / 2;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      data-root-cx={rootCX}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      <g>{lines}</g>

      {layouts.map(layout => {
        const node = people[layout.id];
        if (!node) return null;
        const cx = layout.x - bounds.minX;
        const cy = layout.y - bounds.minY;
        const isFemale = node.gender === 'female';
        const isDeceased = node.deceased;
        const isSelected = selectedId === layout.id;
        const childCount = (node.children || []).length;
        const isExpanded = expandedNodes.has(layout.id);

        const nameText = node.name;
        const initial = getInitials(node.name);
        
        const spouseName = node.spouses && node.spouses.length > 0 
          ? node.spouses.map((name:any)=>name.name).join(' و ')
          : null;

        const bgColor = '#ffffff';
        const borderColor = isSelected ? '#3b82f6' : '#e5e7eb';
        const borderWidth = isSelected ? 2.5 : 1.5;

        return (
          <g
            key={layout.id}
            transform={`translate(${cx}, ${cy})`}
            style={{ cursor: 'pointer' }}
          >
            {/* Card background */}
            <rect
              x={-NODE_W / 2}
              y={0}
              width={NODE_W}
              height={NODE_H}
              rx={12}
              fill={bgColor}
              stroke={borderColor}
              strokeWidth={borderWidth}
              filter="url(#nodeShadow)"
              opacity={isDeceased ? 0.85 : 1}
            />

            {/* Deceased overlay */}
            {isDeceased && (
              <>
                <rect
                  x={-NODE_W / 2}
                  y={0}
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  fill="rgba(0,0,0,0.03)"
                  pointerEvents="none"
                />
                {/* <line x1={-NODE_W / 2 + 8} y1={NODE_H - 8} x2={NODE_W / 2 - 8} y2={8} stroke="#999" strokeWidth={1} opacity={0.3} /> */}
              </>
            )}

            {/* Avatar circle */}
            <circle
              cx={0}
              cy={28}
              r={20}
              fill={isFemale ? '#ec4899' : '#3b82f6'}
              stroke={isSelected ? '#1e40af' : '#fff'}
              strokeWidth={isSelected ? 2.5 : 2}
              onClick={() => onSelect(layout.id)}
            />

            {/* Initial letter */}
            <text
              x={0}
              y={28}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#fff"
              fontSize={16}
              fontWeight="700"
              fontFamily="'Segoe UI', sans-serif"
              onClick={() => onSelect(layout.id)}
            >{initial}</text>

            {/* Name */}
            <foreignObject x={-NODE_W / 2 + 4} y={52} width={NODE_W - 8} height={28}>
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#1f2937',
                  textAlign: 'center',
                  fontFamily: "'Markazi Text', serif",
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  direction: 'rtl',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >{nameText}</div>
            </foreignObject>

            {/* Spouse name */}
            {spouseName && (
              <foreignObject x={-NODE_W / 2 + 4} y={80} width={NODE_W - 8} height={14}>
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    fontSize: 8,
                    color: '#6b7280',
                    textAlign: 'center',
                    fontFamily: "'Amiri', serif",
                    fontStyle: 'italic',
                    direction: 'rtl',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >💍 {spouseName}</div>
              </foreignObject>
            )}

            {/* Expand/collapse button */}
            {childCount > 0 && (
              <g
                onClick={() => onToggleExpand(layout.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle 
                  cx={0} 
                  cy={-12} 
                  r={12} 
                  fill="#3b82f6" 
                  stroke="#fff" 
                  strokeWidth={2}
                  opacity={0.9}
                />
                <text 
                  x={0} 
                  y={-12} 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fontSize={14} 
                  fill="#fff" 
                  fontWeight="700"
                  fontFamily="'Segoe UI', sans-serif"
                  style={{ userSelect: 'none' }}
                >
                  {isExpanded ? '−' : '+'}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ==================== DETAIL PANEL ====================
function DetailPanel({ personId, onClose, onNavigate }: {
  personId: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const person = people[personId];
  if (!person) return null;

  const parent = person.parent ? people[person.parent] : null;
  const children = (person.children || []).map((cid: string) => people[cid]).filter(Boolean);
  const spouses = person.spouses || [];
  const isFemale = person.gender === 'female';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: 360,
      height: '100vh',
      background: '#ffffff',
      borderLeft: '1px solid #e5e7eb',
      boxShadow: '-12px 0 40px rgba(0,0,0,0.08)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      direction: 'rtl',
      fontFamily: "'Markazi Text', 'Amiri', serif",
      overflowY: 'auto',
      animation: 'slideIn 0.3s ease-out',
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '18px 20px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 15, fontWeight: 600, color: '#1f2937' }}>التفاصيل</div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: 20, cursor: 'pointer', padding: '0 8px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1f2937'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>✕</button>
      </div>

      {/* Avatar + Name */}
      <div style={{ padding: '24px 20px 16px', textAlign: 'center', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: isFemale ? '#ec4899' : '#3b82f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, fontWeight: 700, color: '#fff',
          margin: '0 auto 12px',
          border: '3px solid #fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontFamily: "'Segoe UI', sans-serif",
        }}>{getInitials(person.name)}</div>
        <div style={{ fontFamily: "'Markazi Text', serif", fontSize: 17, fontWeight: 600, color: '#1f2937', lineHeight: 1.3 }}>{person.name}</div>
        {person.nickname && (
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginTop: 4 }}>{person.nickname}</div>
        )}
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ background: isFemale ? '#fce7f3' : '#dbeafe', color: isFemale ? '#be185d' : '#1e40af', padding: '4px 10px', borderRadius: 16, fontSize: 10, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>
            {isFemale ? '♀ أنثى' : '♂ ذكر'}
          </span>
          {person.deceased && (
            <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '4px 10px', borderRadius: 16, fontSize: 10, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>في ذمة الله</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
        {person.note && (
          <div style={{ background: '#f0f9ff', borderLeft: '3px solid #3b82f6', borderRadius: 6, padding: '10px 12px', marginBottom: 16, fontSize: 12, color: '#1e3a8a', lineHeight: 1.6, fontFamily: "'Amiri', serif" }}>
            {person.note}
          </div>
        )}
        {person.fatherName && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: '#6b7280', fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>الأب</div>
            <div style={{ fontSize: 13, color: '#1f2937', background: '#f9fafb', padding: '8px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}>👨 {person.fatherName}</div>
          </div>
        )}
        {person.motherName && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: '#6b7280', fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>الأم</div>
            <div style={{ fontSize: 13, color: '#1f2937', background: '#f9fafb', padding: '8px 10px', borderRadius: 6, border: '1px solid #e5e7eb' }}>👩 {person.motherName}</div>
          </div>
        )}

        {parent && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: '#6b7280', fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>{parent.gender === 'female' ? 'الأم' : 'الأب'}</div>
            <button onClick={() => onNavigate(parent.id)} style={{
              width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6,
              padding: '10px 10px', cursor: 'pointer', textAlign: 'right',
              display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'inherit', transition: 'all 0.2s',
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: parent.gender === 'female' ? '#ec4899' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>{getInitials(parent.name)}</div>
              <span style={{ fontSize: 13, color: '#1f2937', fontFamily: "'Markazi Text', serif", fontWeight: 600 }}>{parent.name}</span>
            </button>
          </div>
        )}

        {spouses.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: '#6b7280', fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>
              {isFemale ? 'الزوج' : (spouses.length > 1 ? 'الزوجات' : 'الزوجة')}
            </div>
            {spouses.map((s: any, i: number) => (
              <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, padding: '10px 10px', marginBottom: 6, fontSize: 12, color: '#1f2937' }}>
                💍 {s.name}
                {s.note && <div style={{ fontSize: 10, color: '#6b7280', marginTop: 3, fontStyle: 'italic' }}>{s.note}</div>}
              </div>
            ))}
          </div>
        )}

        {children.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, color: '#6b7280', fontFamily: "'Segoe UI', sans-serif", marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>
              الأبناء ({children.length})
            </div>
            {children.map((c: any) => (
              <button key={c.id} onClick={() => onNavigate(c.id)} style={{
                width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6,
                padding: '8px 10px', cursor: 'pointer', textAlign: 'right',
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, fontFamily: 'inherit', transition: 'all 0.2s',
              }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.gender === 'female' ? '#ec4899' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>{getInitials(c.name)}</div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#1f2937', fontFamily: "'Markazi Text', serif", fontWeight: 600 }}>{c.name}</div>
                  {c.nickname && <div style={{ fontSize: 9, color: '#6b7280', fontStyle: 'italic' }}>{c.nickname}</div>}
                </div>
                {(c.children || []).length > 0 && (
                  <span style={{ fontSize: 9, color: '#fff', background: '#3b82f6', padding: '2px 5px', borderRadius: 4, fontWeight: 600 }}>{(c.children || []).length}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SEARCH PANEL ====================
function SearchPanel({ onClose, onSelect }: { onClose: () => void; onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const matches = useMemo(() => {
    const q = query.trim();
    if (!q) return null;
    return getAllPeople().filter(p => ((p.name || '') + ' ' + (p.nickname || '')).includes(q));
  }, [query]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80, animation: 'fadeIn 0.2s ease-out' }} onClick={onClose}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{ background: '#fff', borderRadius: 12, width: '90%', maxWidth: 500, maxHeight: '65vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', direction: 'rtl', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 8, background: '#f9fafb' }}>
          <input ref={inputRef} type="text" placeholder="ابحث عن اسم..." value={query} onChange={e => setQuery(e.target.value)}
            style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', fontFamily: "'Markazi Text', serif", fontSize: 14, color: '#1f2937', outline: 'none', direction: 'rtl', transition: 'border-color 0.2s' }} onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'} onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'} />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', color: '#6b7280', padding: '0 8px' }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', padding: 12 }}>
          {matches === null && <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280', fontFamily: "'Amiri', serif", fontSize: 14 }}>🔍 اكتب اسم من العيلة</div>}
          {matches !== null && matches.length === 0 && <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280', fontFamily: "'Amiri', serif", fontSize: 14 }}>لا توجد نتائج</div>}
          {matches !== null && matches.map(p => (
            <button key={p.id} onClick={() => { onSelect(p.id); onClose(); }} style={{ width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 10px', cursor: 'pointer', textAlign: 'right', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, fontFamily: 'inherit', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#eff6ff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: p.gender === 'female' ? '#ec4899' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", flexShrink: 0 }}>{getInitials(p.name)}</div>
              <div>
                <div style={{ fontSize: 13, color: '#1f2937', fontFamily: "'Markazi Text', serif", fontWeight: 600 }}>{p.name}</div>
                {p.nickname && <div style={{ fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>{p.nickname}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== ABOUT PANEL ====================
function AboutPanel({ onClose }: { onClose: () => void }) {
  const stats = useMemo(() => {
    const all = getAllPeople();
    return { total: all.length, deceased: all.filter((p: any) => p.deceased).length };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }} onClick={onClose}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{ background: '#fff', borderRadius: 12, width: '90%', maxWidth: 650, maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', direction: 'rtl', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '16px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 16, fontWeight: 600, color: '#1f2937' }}>عن عائلة المقمر</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', padding: '18px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
            {[{ num: stats.total, lbl: 'فرد' }, { num: '٤', lbl: 'أجيال' }, { num: stats.deceased, lbl: 'في ذمة الله' }].map((s, i) => (
              <div key={i} style={{ background: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 24, fontWeight: 700, color: '#1e40af' }}>{s.num}</div>
                <div style={{ fontSize: 11, color: '#1e40af', fontFamily: "'Amiri', serif", marginTop: 3 }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#f0f9ff', borderLeft: '3px solid #3b82f6', borderRadius: 6, padding: '12px 14px', marginBottom: 14, fontSize: 14, color: '#1e3a8a', lineHeight: 1.7, fontFamily: "'Amiri', serif", fontWeight: 500 }}>
            صلة الرحم بيننا هبة من الله
          </div>

          <div style={{ background: '#f0f9ff', borderLeft: '3px solid #3b82f6', borderRadius: 6, padding: '12px 14px', marginBottom: 16, fontSize: 13, color: '#1e3a8a', lineHeight: 1.7, fontFamily: "'Amiri', serif" }}>
            الهدف من هذا الجمع هو التعارف والتواصل والتراحم وصلة الرحم بين أبناء عائلة المقمر الكريمة، المعروفة سابقًا باسم أبو عمرية، حسب رواية الحاج عبدالعزيز المقمر رحمه الله.
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>أصل العائلة</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', marginBottom: 10, fontFamily: "'Amiri', serif" }}>
            عائلة المقمر عائلة عريقة، جذورها تمتد في مدينة زفتي وقراها، ومنها فروع في محافظة البحيرة (أبو حمص وإدكو ودمنهور وكفر الدوار)، وفي بورسعيد، والإسكندرية، وأسوان، والفيوم، وخارج مصر.
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', marginBottom: 10, fontFamily: "'Amiri', serif" }}>
            الجد الأكبر الموثق لدينا هو <strong>الحاج مصطفى مصطفى علي المقمر</strong> رحمة الله عليه، توفي سنة 1949، وله ذرية كثيرة من عدة زوجات، انتشرت في أنحاء الجمهورية.
          </p>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>تسمية المقمر</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', marginBottom: 10, fontFamily: "'Amiri', serif" }}>
            هناك روايات عن سبب تسمية العائلة بهذا الاسم. من أشهرها رواية العيش المقمر الذي كان يُقدم للعمال أثناء البناء، فكانوا يقولون "المقمر جه". وبعض أبناء البحيرة يرجع النسب إلى آل المنير من الأشراف نسبة للحسين رضي الله عنه.
          </p>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>قيم العائلة</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', marginBottom: 10, fontFamily: "'Amiri', serif" }}>
            هذه العائلة مبنية على الود والاحترام وصلة الرحم، ومن تقاليدها الاجتماع على الخير، والوقوف جنب بعض في الأفراح والأحزان. وكان للأجداد <strong>"صندوق العائلة"</strong> الذي كانوا يساعدون به من يمر بظروف قهرية.
          </p>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>فضل جامع الشمل</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', marginBottom: 14, fontFamily: "'Amiri', serif" }}>
            الحاج <strong>أحمد عبد العظيم المقمر</strong> (أبو أحمد) له الفضل بعد الله في إنشاء جروب العائلة الذي جمع شمل أفرادها، وأعاد التواصل بين فروعها المتفرقة.
          </p>

          <div style={{ background: '#f0f9ff', borderRadius: 8, padding: '12px 14px', textAlign: 'center', fontSize: 12, color: '#1e3a8a', lineHeight: 1.7, fontFamily: "'Amiri', serif", marginBottom: 12 }}>
            اللهم اغفر لمن سبقونا من هذه العائلة الطيبة،<br />
            وبارك لنا فيمن بقي،<br />
            واجعل صلة الرحم في ميزان حسناتنا جميعاً
            <br /><br />
            <small style={{ color: '#3b82f6', fontWeight: 600 }}>— اللهم آمين</small>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>عن هذا الموقع</h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#374151', fontFamily: "'Amiri', serif" }}>
            تم جمع بيانات هذه الشجرة من محادثات جروب العائلة، ومن الأوراق التي كتبها بخط يده الحاج عبد العزيز مصطفى المقمر رحمه الله، ومن شهادات الأجداد والكبار.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function FamilyTreeApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [activeRoot, setActiveRoot] = useState<'root' | 'bohaira-root'>('root');
  const [zoom, setZoom] = useState(1);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.getElementById('fm-visual-styles');
    if (existing) return;

    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');

    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Markazi+Text:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = 'fm-visual-styles';
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; font-family: 'Markazi Text','Amiri',serif; background: #ffffff; color: #1f2937; overflow: hidden; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: #f3f4f6; }
      ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const centerOnRoot = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const svgEl = container.querySelector('svg');
    if (!svgEl) return;
    const rootCX = parseFloat(svgEl.getAttribute('data-root-cx') || '0');
    const containerW = container.clientWidth;
    const scrollTarget = Math.max(0, rootCX * zoom - containerW / 2);
    container.scrollLeft = scrollTarget;
    container.scrollTop = 0;
  }, [zoom]);

  useEffect(() => {
    const timer = setTimeout(centerOnRoot, 300);
    return () => clearTimeout(timer);
  }, [activeRoot, centerOnRoot]);

  const totalPeople = useMemo(() => getAllPeople().length, []);

  return (
    
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      background: '#ffffff',
      direction: 'rtl',
      fontFamily: "'Markazi Text', 'Amiri', serif",
      overflow: 'hidden',
    }}>
      {/* Top Bar */}
      <div style={{
        height: 64, background: '#ffffff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌳</div>
          <div>
            <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 18, fontWeight: 700, color: '#1f2937', lineHeight: 1.2 }}>عائلة المقمر</div>
            <div style={{ fontSize: 11, color: '#6b7280', fontFamily: "'Amiri', serif" }}>{totalPeople} فرد</div>
          </div>
        </div>

        {/* Branch Switcher */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['root', 'bohaira-root'] as const).map((branch) => (
            <button key={branch} onClick={() => { setActiveRoot(branch); setSelectedId(null); }} 
            style={{
              padding: '8px 14px', borderRadius: 6, border: '1px solid #e5e7eb',
              marginLeft: "5px",
              background: activeRoot === branch ? '#3b82f6' : '#f9fafb',
              color: activeRoot === branch ? '#fff' : '#1f2937',
              fontFamily: "'Segoe UI', sans-serif", fontSize: 12, cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
            }} 
            onMouseEnter={(e) => { if (activeRoot !== branch) { e.currentTarget.style.background = '#f3f4f6'; } }} onMouseLeave={(e) => { if (activeRoot !== branch) { e.currentTarget.style.background = '#f9fafb'; } }}>
              {branch === 'root' ? '🏘 زفتي' : '🌊 البحيرة'}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setShowSearch(true)} style={{ width: 40, height: 40, borderRadius: 6, background: '#f3f4f6', border: 'none', color: '#3b82f6', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e5e7eb'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}>🔍</button>
          <button onClick={() => setShowAbout(true)} style={{ width: 40, height: 40, borderRadius: 6, background: '#f3f4f6', border: 'none', color: '#3b82f6', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e5e7eb'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}>ℹ️</button>
        </div>
      </div>

      {/* Legend Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: '8px 20px',
        background: '#f9fafb', borderBottom: '1px solid #e5e7eb',
        flexShrink: 0, flexWrap: 'wrap', fontSize: 12, color: '#6b7280',
      }}>
        <span>♂ ذكر</span>
        <span>•</span>
        <span>♀ أنثى</span>
        <span>•</span>
        <span>اضغط +/− للفتح/الإغلاق</span>
      </div>

      {/* Zoom Controls */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))} style={{ width: 36, height: 36, borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb', color: '#3b82f6', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s', fontWeight: 700 }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}>+</button>
        <button onClick={() => setZoom(1)} style={{ width: 36, height: 36, borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb', color: '#3b82f6', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', fontFamily: "'Segoe UI', sans-serif", fontWeight: 700, transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}>{Math.round(zoom * 100)}%</button>
        <button onClick={() => setZoom(z => Math.max(z - 0.15, 0.3))} style={{ width: 36, height: 36, borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb', color: '#3b82f6', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s', fontWeight: 700 }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}>−</button>
        <button
          title="توسيط على الجذر"
          onClick={centerOnRoot}
          style={{ width: 36, height: 36, borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb', color: '#3b82f6', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
        >⌖</button>
      </div>

      {/* Tree Canvas */}
      <div ref={containerRef} style={{ flex: 1, overflow: 'auto', padding: '20px', position: 'relative', direction: 'ltr', background: '#ffffff' }}>
        <div style={{ display: 'inline-block', transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s' }}>
          <TreeSVG
            rootId={activeRoot}
            selectedId={selectedId}
            onSelect={handleSelect}
            expandedNodes={expandedNodes}
            onToggleExpand={handleToggleExpand}
          />
        </div>
      </div>

      {/* Detail Panel */}
      {selectedId && (
        <DetailPanel personId={selectedId} onClose={() => setSelectedId(null)} onNavigate={handleNavigate} />
      )}

      {/* Overlays */}
      {showSearch && <SearchPanel onClose={() => setShowSearch(false)} onSelect={(id) => { setSelectedId(id); setShowSearch(false); }} />}
      {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}
    </div>
  );
}
