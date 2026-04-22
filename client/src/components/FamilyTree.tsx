import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ==================== FAMILY DATA ====================
const people: any = {
  "root": {
    id: "root",
    name: "مصطفى علي المقمر",
    nickname: "الجد الأكبر للعائلة",
    note: "الجد الأكبر الموثق لعائلة المقمر. توفي سنة 1949 رحمه الله. وله ذرية كثيرة انتشرت في زفتي والبحيرة وبورسعيد وأسوان ومصر كلها.",
    gender: "male",
    deceased: true,
    birthYear: "1880",
    deathYear: "1949",
    spouses: [
      { name: "خضرة", note: "من أوائل زوجاته" },
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
    id: "ibrahim-mostafa", name: "إبراهيم مصطفى المقمر", nickname: "الدسوقي",
    gender: "male", deceased: true, parent: "root",
    note: "كان معروف بلقب الدسوقي"
  },
  "anisa-mostafa": {
    id: "anisa-mostafa", name: "الحاجة أنيسة مصطفى المقمر",
    gender: "female", deceased: true, parent: "root",
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
    children: ["mostafa-abdelaziz", "magdy-abdelaziz", "mamdouh-abdelaziz", "howaida-abdelaziz", "hala-abdelaziz", "hanaa-abdelaziz", "heba-abdelaziz", "khaled-abdelaziz", "haytham-abdelaziz", "iman-abdelaziz"]
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
  "abdelmonem-older": {
    id: "abdelmonem-older", name: "عبد المنعم مصطفى المقمر (الأكبر)",
    gender: "male", deceased: true, parent: "root",
    note: "كان شغال في الكهرباء - في الحي البحري"
  },
  "ibrahim-bonn": {
    id: "ibrahim-bonn", name: "إبراهيم مصطفى المقمر",
    gender: "male", deceased: true, parent: "root",
    note: "كان تاجر بن في شارع سعد زغلول"
  },

  "abdelazeem-ahmed": {
    id: "abdelazeem-ahmed", name: "الحاج عبد العظيم أحمد المقمر",
    gender: "male", deceased: true, parent: "ahmed-mostafa",
    motherName: "هانم درويش",
    spouses: [{ name: "الحاجة نفيسة عبد الوهاب عامر" }],
    children: ["ahmed-abdelazeem", "osama-abdelazeem", "ebtesam-abdelazeem", "asmaa-abdelazeem", "rabab-abdelazeem"]
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
    gender: "male", deceased: true, parent: "ahmed-mostafa",
    motherName: "وهيبة",
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
    gender: "male", deceased: true, parent: "mohamed-mostafa",
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

  "mostafa-abdelaziz": {
    id: "mostafa-abdelaziz", name: "الحاج مصطفى عبد العزيز المقمر",
    gender: "male", deceased: true, parent: "abdelaziz-mostafa",
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
    id: "ahmed-abdelazeem", name: "الحاج أحمد عبد العظيم المقمر", nickname: "أبو أحمد",
    gender: "male", parent: "abdelazeem-ahmed",
    note: "منشئ جروب العائلة الذي جمع شمل العائلة كلها - الله يجزيه خير"
  },
  "osama-abdelazeem": { id: "osama-abdelazeem", name: "الحاج أسامة عبد العظيم المقمر", gender: "male", parent: "abdelazeem-ahmed", note: "له بنت صغيرة اسمها مريم (آخر العنقود)" },
  "ebtesam-abdelazeem": { id: "ebtesam-abdelazeem", name: "ابتسام عبد العظيم المقمر", gender: "female", parent: "abdelazeem-ahmed" },
  "asmaa-abdelazeem": { id: "asmaa-abdelazeem", name: "أسماء عبد العظيم المقمر", gender: "female", parent: "abdelazeem-ahmed" },
  "rabab-abdelazeem": { id: "rabab-abdelazeem", name: "رباب عبد العظيم المقمر", nickname: "آخر العنقود", gender: "female", parent: "abdelazeem-ahmed" },

  "mostafa-mohamed-a": { id: "mostafa-mohamed-a", name: "مصطفى محمد المقمر", gender: "male", deceased: true, parent: "mohamed-ahmed" },
  "ahmed-mohamed-a": { id: "ahmed-mohamed-a", name: "أحمد محمد المقمر", gender: "male", parent: "mohamed-ahmed" },
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

  "ahmed-mosaad": { id: "ahmed-mosaad", name: "الأستاذ أحمد مسعد المقمر", gender: "male", parent: "mosaad-ahmed" },
  "mohamed-mosaad": { id: "mohamed-mosaad", name: "محمد مسعد المقمر", gender: "male", parent: "mosaad-ahmed" },
  "amira-mosaad": { id: "amira-mosaad", name: "أميرة مسعد المقمر", gender: "female", parent: "mosaad-ahmed" },
  "abdelrahman-mosaad": { id: "abdelrahman-mosaad", name: "عبد الرحمن مسعد المقمر", gender: "male", parent: "mosaad-ahmed" },

  "mohamed-im": { id: "mohamed-im", name: "محمد إبراهيم", gender: "male", parent: "ibrahim-mohamed" },
  "ahmed-im": { id: "ahmed-im", name: "أحمد إبراهيم", gender: "male", parent: "ibrahim-mohamed" },
  "fatma-im": { id: "fatma-im", name: "فاطمة إبراهيم", gender: "female", parent: "ibrahim-mohamed" },
  "abdelfattah-im": { id: "abdelfattah-im", name: "عبد الفتاح إبراهيم", gender: "male", parent: "ibrahim-mohamed" },

  "ibrahim-af": { id: "ibrahim-af", name: "إبراهيم عبد الفتاح المقمر", nickname: "عمور", gender: "male", parent: "abdelfattah-mohamed" },
  "omar-af": { id: "omar-af", name: "عمر عبد الفتاح المقمر", gender: "male", parent: "abdelfattah-mohamed" },
  "yousef-af": { id: "yousef-af", name: "يوسف عبد الفتاح المقمر", gender: "male", parent: "abdelfattah-mohamed" },

  "khaled-m": { id: "khaled-m", name: "خالد مصطفى المقمر", gender: "male", parent: "mostafa-abdelaziz", note: "محاسب بالمقاولين العرب باسوان" },
  "mohamed-m-aswan": { id: "mohamed-m-aswan", name: "محمد مصطفى المقمر", gender: "male", parent: "mostafa-abdelaziz" },
  "iman-m-aswan": { id: "iman-m-aswan", name: "الأستاذة إيمان مصطفى المقمر", gender: "female", parent: "mostafa-abdelaziz", note: "كانت مديرة مدرسة في أسوان" },
  "ashgan-m": { id: "ashgan-m", name: "أشجان مصطفى المقمر", gender: "female", parent: "mostafa-abdelaziz" },
  "hend-m": { id: "hend-m", name: "هند مصطفى المقمر", gender: "female", parent: "mostafa-abdelaziz" },
  "hala-m": { id: "hala-m", name: "هالة مصطفى المقمر", gender: "female", parent: "mostafa-abdelaziz" },

  "sahar-az": { id: "sahar-az", name: "سحر", gender: "female", parent: "mostafa-abouzeid" },
  "hala-az": { id: "hala-az", name: "هالة", gender: "female", parent: "mostafa-abouzeid" },
  "mahmoud-az": { id: "mahmoud-az", name: "محمود", gender: "male", parent: "mostafa-abouzeid" },
  "mervat-az": { id: "mervat-az", name: "مرفت", gender: "female", parent: "mostafa-abouzeid" },
  "ebtesam-az": { id: "ebtesam-az", name: "ابتسام", gender: "female", deceased: true, parent: "mostafa-abouzeid", spouses: [{ name: "الأستاذ مجدي الكفراوي" }] },
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
    gender: "male", deceased: true, parent: "bohaira-root",
    children: ["ahmed-mohamed-yousef"]
  },
  "ahmed-mohamed-yousef": {
    id: "ahmed-mohamed-yousef", name: "أحمد محمد يوسف المقمر",
    gender: "male", parent: "mohamed-yousef",
    note: "من أبو حمص البحيرة"
  },
  "mohamed-elsaeed": {
    id: "mohamed-elsaeed", name: "الحاج محمد السعيد العزب المقمر",
    gender: "male", deceased: true, parent: "bohaira-root",
    note: "كان يروي أنهم تقريباً 6 إخوة جاءوا من أبو حمص لزفتي"
  },
  "rajab-saad": {
    id: "rajab-saad", name: "الحاج رجب سعد المقمر",
    gender: "male", parent: "bohaira-root"
  }
};

// ==================== HELPERS ====================
const TITLES = ['الحاج', 'الحاجة', 'الأستاذ', 'الأستاذة', 'الدكتور', 'الدكتورة', 'د.', 'م.', 'المهندس'];

function getInitial(name: string): string {
  if (!name) return '';
  let parts = name.trim().split(/\s+/);
  for (const title of TITLES) {
    if (parts[0] === title || name.startsWith(title)) {
      parts = name.replace(title, '').trim().split(/\s+/);
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
  if (parts.length <= 2) return clean;
  return parts.slice(0, 2).join(' ');
}

function getSiblings(personId: string): any[] {
  const person = people[personId];
  if (!person || !person.parent) return [];
  const parent = people[person.parent];
  if (!parent || !parent.children) return [];
  return parent.children.filter((id: string) => id !== personId).map((id: string) => people[id]).filter(Boolean);
}

function getAllPeople(): any[] {
  return Object.values(people).filter((p: any) => p && p.name);
}

function buildAncestry(id: string): any[] {
  const chain = [];
  let cur = id;
  while (cur && people[cur]) {
    chain.unshift(people[cur]);
    cur = people[cur].parent;
  }
  return chain;
}

// ==================== STYLES ====================
const STYLES = `
:root {
  --male-color: #3B82F6;
  --male-color-light: #60A5FA;
  --female-color: #EC4899;
  --female-color-light: #F472B6;
  --couple-color: #10B981;
  --couple-color-light: #34D399;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --bg-white: #FFFFFF;
  --bg-gray: #F9FAFB;
  --line-color: #9CA3AF;
  --heart-color: #10B981;
}

.fm-root * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
.fm-root { direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
html, body, #root { height: 100%; overscroll-behavior: none; }
body {
  background: var(--bg-white);
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  position: fixed;
  inset: 0;
}

/* Header Title Card */
.title-card {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%);
  border-radius: 20px;
  padding: 24px 32px;
  color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 40px rgba(30, 58, 95, 0.3);
}

.title-card .tree-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-card .tree-icon svg {
  width: 50px;
  height: 50px;
  fill: #60A5FA;
}

.title-card .title-text h1 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
  font-family: 'Reem Kufi', 'Segoe UI', sans-serif;
}

.title-card .title-text p {
  font-size: 14px;
  opacity: 0.85;
  font-style: italic;
}

/* Tree Container */
.tree-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow: auto;
  padding: 140px 40px 40px;
  background: var(--bg-white);
}

.tree-container::-webkit-scrollbar { width: 8px; height: 8px; }
.tree-container::-webkit-scrollbar-track { background: transparent; }
.tree-container::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }

/* Tree Structure */
.tree-level {
  display: flex;
  justify-content: center;
  gap: 20px;
  position: relative;
  padding: 20px 0;
}

.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 100px;
}

/* Person Card */
.person-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.person-node:hover {
  transform: scale(1.05);
}

.avatar-container {
  position: relative;
  margin-bottom: 8px;
}

.avatar-ring {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-ring.male {
  background: linear-gradient(135deg, var(--male-color), var(--male-color-light));
}

.avatar-ring.female {
  background: linear-gradient(135deg, var(--female-color), var(--female-color-light));
}

.avatar-ring.couple {
  background: linear-gradient(135deg, var(--couple-color), var(--couple-color-light));
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
}

.person-dates {
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
}

.person-dates .deceased {
  color: var(--text-secondary);
}

.person-dates .alive {
  color: var(--couple-color);
}

/* Connection Lines */
.connector-down {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 30px;
  background: var(--line-color);
}

.connector-horizontal {
  height: 2px;
  background: var(--line-color);
  position: absolute;
  top: 0;
}

.heart-connector {
  position: absolute;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.heart-connector svg {
  width: 12px;
  height: 12px;
  fill: var(--heart-color);
}

/* Children Container */
.children-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-top: 30px;
  position: relative;
}

.children-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 30px;
  background: var(--line-color);
}

.children-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  position: relative;
}

.children-row::before {
  content: '';
  position: absolute;
  top: 0;
  height: 2px;
  background: var(--line-color);
  left: calc(50px);
  right: calc(50px);
}

.child-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.child-branch::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: var(--line-color);
}

.child-branch .heart-connector {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Bottom Navigation */
.bottomnav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg-white);
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
}

.nav-btn {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 16px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
  border-radius: 8px;
}

.nav-btn:hover {
  background: var(--bg-gray);
}

.nav-btn .nav-icon {
  font-size: 20px;
}

.nav-btn.active {
  color: var(--male-color);
}

/* Search Overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg-white);
  z-index: 200;
  display: none;
  flex-direction: column;
}

.search-overlay.open {
  display: flex;
}

.search-header {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #E5E7EB;
  border-radius: 30px;
  background: var(--bg-gray);
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  direction: rtl;
  font-family: inherit;
}

.search-input:focus {
  border-color: var(--male-color);
  background: var(--bg-white);
}

.search-results {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.search-empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.search-empty .icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Person Card in Search */
.search-person {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: var(--bg-white);
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s;
}

.search-person:hover {
  border-color: var(--male-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-person .mini-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 2px;
  flex-shrink: 0;
}

.search-person .mini-avatar.male {
  background: linear-gradient(135deg, var(--male-color), var(--male-color-light));
}

.search-person .mini-avatar.female {
  background: linear-gradient(135deg, var(--female-color), var(--female-color-light));
}

.search-person .mini-avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

.search-person .info {
  flex: 1;
  min-width: 0;
}

.search-person .name {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.search-person .sub {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Detail Panel */
.detail-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-white);
  z-index: 150;
  display: none;
  flex-direction: column;
  overflow: hidden;
}

.detail-panel.open {
  display: flex;
}

.detail-header {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  gap: 12px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-gray);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-primary);
  transition: all 0.2s;
}

.back-btn:hover {
  background: #E5E7EB;
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.detail-hero {
  text-align: center;
  margin-bottom: 32px;
}

.detail-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 4px;
  margin: 0 auto 16px;
}

.detail-avatar.male {
  background: linear-gradient(135deg, var(--male-color), var(--male-color-light));
}

.detail-avatar.female {
  background: linear-gradient(135deg, var(--female-color), var(--female-color-light));
}

.detail-avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 600;
}

.detail-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.detail-nickname {
  font-size: 16px;
  color: var(--text-secondary);
  font-style: italic;
}

.detail-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.detail-status.deceased {
  background: #FEF3C7;
  color: #92400E;
}

.detail-status.alive {
  background: #D1FAE5;
  color: #065F46;
}

.detail-note {
  margin-top: 20px;
  padding: 16px;
  background: var(--bg-gray);
  border-radius: 12px;
  border-right: 4px solid var(--male-color);
  text-align: right;
  color: var(--text-secondary);
  line-height: 1.7;
}

.detail-section {
  margin-top: 24px;
}

.detail-section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

/* Gradient Bar */
.gradient-bar {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(to left, 
    #3B82F6 0%, 
    #10B981 16%, 
    #84CC16 32%, 
    #EAB308 48%, 
    #F97316 64%, 
    #EF4444 80%, 
    #EC4899 100%
  );
  z-index: 99;
}

/* Icon Button */
.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-gray);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-primary);
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #E5E7EB;
}

/* Family Tree Visual */
.visual-tree {
  min-width: max-content;
  padding: 20px;
}

.generation {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 60px;
}

.generation-members {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: flex-start;
}

.family-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.couple-row {
  display: flex;
  gap: 20px;
  align-items: center;
  position: relative;
}

.couple-connector {
  display: flex;
  align-items: center;
  gap: 0;
}

.couple-line {
  width: 30px;
  height: 2px;
  background: var(--line-color);
}

.couple-heart {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-white);
  z-index: 5;
}

.couple-heart svg {
  width: 14px;
  height: 14px;
  fill: var(--heart-color);
}

/* Vertical Tree Lines */
.tree-line-v {
  position: absolute;
  width: 2px;
  background: var(--line-color);
}

.tree-line-h {
  position: absolute;
  height: 2px;
  background: var(--line-color);
}

.tree-junction {
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tree-junction svg {
  width: 12px;
  height: 12px;
  fill: var(--heart-color);
}

/* Responsive */
@media (max-width: 768px) {
  .title-card {
    right: 10px;
    left: 10px;
    top: 10px;
    padding: 16px 20px;
  }
  
  .title-card .tree-icon {
    width: 40px;
    height: 40px;
  }
  
  .title-card .tree-icon svg {
    width: 35px;
    height: 35px;
  }
  
  .title-card .title-text h1 {
    font-size: 18px;
  }
  
  .title-card .title-text p {
    font-size: 12px;
  }
  
  .tree-container {
    padding: 120px 20px 20px;
  }
  
  .avatar-ring {
    width: 55px;
    height: 55px;
  }
  
  .avatar-inner {
    font-size: 18px;
  }
  
  .person-name {
    font-size: 11px;
    max-width: 80px;
  }
  
  .person-dates {
    font-size: 9px;
  }
  
  .generation-members {
    gap: 15px;
  }
}
`;

// ==================== SVG ICONS ====================
const TreeIcon = () => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="35" r="30" fill="currentColor" opacity="0.3"/>
    <circle cx="30" cy="45" r="20" fill="currentColor" opacity="0.4"/>
    <circle cx="70" cy="45" r="20" fill="currentColor" opacity="0.4"/>
    <circle cx="50" cy="25" r="22" fill="currentColor" opacity="0.5"/>
    <rect x="45" y="55" width="10" height="30" fill="#8B5A2B"/>
    <rect x="35" y="85" width="30" height="5" rx="2" fill="#8B5A2B"/>
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// ==================== PERSON NODE COMPONENT ====================
function PersonNode({ person, onClick, size = 'normal' }: { person: any; onClick: () => void; size?: 'normal' | 'small' }) {
  const isSmall = size === 'small';
  const ringSize = isSmall ? 55 : 70;
  const fontSize = isSmall ? 18 : 24;
  const nameSize = isSmall ? 11 : 13;
  const dateSize = isSmall ? 9 : 11;
  
  return (
    <div className="person-node" onClick={onClick}>
      <div className="avatar-container">
        <div 
          className={`avatar-ring ${person.gender === 'female' ? 'female' : 'male'}`}
          style={{ width: ringSize, height: ringSize }}
        >
          <div className="avatar-inner" style={{ fontSize }}>
            {getInitial(person.name)}
          </div>
        </div>
      </div>
      <div className="person-name" style={{ fontSize: nameSize }}>
        {shortenName(person.name)}
      </div>
      <div className="person-dates" style={{ fontSize: dateSize }}>
        {person.deceased ? (
          <span className="deceased">رحمه الله</span>
        ) : (
          <span className="alive">حفظه الله</span>
        )}
      </div>
    </div>
  );
}

// ==================== TREE VIEW COMPONENT ====================
function TreeView({ onSelectPerson }: { onSelectPerson: (id: string) => void }) {
  const root = people['root'];
  const rootChildren = (root.children || []).map((id: string) => people[id]).filter(Boolean);

  return (
    <div className="visual-tree">
      {/* Root Generation */}
      <div className="generation">
        <div className="family-unit">
          <PersonNode person={root} onClick={() => onSelectPerson(root.id)} />
          
          {/* Connection line to children */}
          {rootChildren.length > 0 && (
            <div style={{ 
              width: 2, 
              height: 30, 
              background: 'var(--line-color)', 
              margin: '10px auto' 
            }} />
          )}
        </div>
      </div>

      {/* First Generation Children */}
      {rootChildren.length > 0 && (
        <div className="generation">
          <div style={{ position: 'relative' }}>
            {/* Horizontal connector line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 50,
              right: 50,
              height: 2,
              background: 'var(--line-color)'
            }} />
            
            <div className="generation-members" style={{ paddingTop: 20 }}>
              {rootChildren.slice(0, 6).map((child: any, index: number) => (
                <div key={child.id} className="family-unit">
                  {/* Vertical connector */}
                  <div style={{
                    width: 2,
                    height: 20,
                    background: 'var(--line-color)',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }} />
                  
                  {/* Heart connector */}
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--bg-white)',
                    width: 16,
                    height: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5
                  }}>
                    <HeartIcon />
                  </div>
                  
                  <PersonNode 
                    person={child} 
                    onClick={() => onSelectPerson(child.id)}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Show more children indicator */}
      {rootChildren.length > 6 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: 'var(--text-secondary)',
          fontSize: 14
        }}>
          +{rootChildren.length - 6} more family members
        </div>
      )}

      {/* Second Generation Preview */}
      {rootChildren.slice(0, 3).map((child: any) => {
        const grandchildren = (child.children || []).map((id: string) => people[id]).filter(Boolean);
        if (grandchildren.length === 0) return null;
        
        return (
          <div key={`gen2-${child.id}`} className="generation" style={{ marginTop: 20 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                textAlign: 'center', 
                marginBottom: 10,
                fontSize: 12,
                color: 'var(--text-secondary)'
              }}>
                أبناء {shortenName(child.name)}
              </div>
              <div className="generation-members">
                {grandchildren.slice(0, 5).map((gc: any) => (
                  <PersonNode 
                    key={gc.id}
                    person={gc} 
                    onClick={() => onSelectPerson(gc.id)}
                    size="small"
                  />
                ))}
                {grandchildren.length > 5 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 55,
                    height: 55,
                    borderRadius: '50%',
                    background: 'var(--bg-gray)',
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }} onClick={() => onSelectPerson(child.id)}>
                    +{grandchildren.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==================== DETAIL PANEL ====================
function DetailPanel({ person, open, onClose, onNavigate }: { 
  person: any; 
  open: boolean; 
  onClose: () => void; 
  onNavigate: (id: string) => void;
}) {
  if (!person) return null;

  const parent = person.parent ? people[person.parent] : null;
  const siblings = getSiblings(person.id);
  const children = (person.children || []).map((cid: string) => people[cid]).filter(Boolean);
  const spouses = person.spouses || [];

  return (
    <div className={`detail-panel${open ? ' open' : ''}`}>
      <header className="detail-header">
        <button className="back-btn" onClick={onClose} aria-label="Close">
          &#8592;
        </button>
        <span style={{ fontWeight: 600 }}>تفاصيل الشخص</span>
      </header>
      
      <div className="detail-content">
        <div className="detail-hero">
          <div className={`detail-avatar ${person.gender === 'female' ? 'female' : 'male'}`}>
            <div className="detail-avatar-inner">
              {getInitial(person.name)}
            </div>
          </div>
          <h1 className="detail-name">{person.name}</h1>
          {person.nickname && <p className="detail-nickname">{person.nickname}</p>}
          
          <div className={`detail-status ${person.deceased ? 'deceased' : 'alive'}`}>
            {person.deceased ? 'رحمه الله' : 'حفظه الله'}
          </div>
          
          {person.note && <div className="detail-note">{person.note}</div>}
        </div>

        {parent && (
          <div className="detail-section">
            <div className="detail-section-title">
              {parent.gender === 'female' ? 'الأم' : 'الأب'}
            </div>
            <div 
              className="search-person"
              onClick={() => onNavigate(parent.id)}
            >
              <div className={`mini-avatar ${parent.gender === 'female' ? 'female' : 'male'}`}>
                <div className="mini-avatar-inner">{getInitial(parent.name)}</div>
              </div>
              <div className="info">
                <div className="name">{parent.name}</div>
              </div>
            </div>
          </div>
        )}

        {spouses.length > 0 && (
          <div className="detail-section">
            <div className="detail-section-title">
              {person.gender === 'female' ? 'الزوج' : (spouses.length > 1 ? 'الزوجات' : 'الزوجة')}
            </div>
            {spouses.map((s: any, i: number) => (
              <div key={i} style={{
                padding: '12px 16px',
                background: 'var(--bg-gray)',
                borderRadius: 12,
                marginBottom: 8
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                {s.note && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.note}</div>}
              </div>
            ))}
          </div>
        )}

        {children.length > 0 && (
          <div className="detail-section">
            <div className="detail-section-title">الأبناء ({children.length})</div>
            {children.map((c: any) => (
              <div 
                key={c.id}
                className="search-person"
                onClick={() => onNavigate(c.id)}
              >
                <div className={`mini-avatar ${c.gender === 'female' ? 'female' : 'male'}`}>
                  <div className="mini-avatar-inner">{getInitial(c.name)}</div>
                </div>
                <div className="info">
                  <div className="name">{c.name}</div>
                  {c.nickname && <div className="sub">{c.nickname}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {siblings.length > 0 && (
          <div className="detail-section">
            <div className="detail-section-title">الإخوة والأخوات ({siblings.length})</div>
            {siblings.map((s: any) => (
              <div 
                key={s.id}
                className="search-person"
                onClick={() => onNavigate(s.id)}
              >
                <div className={`mini-avatar ${s.gender === 'female' ? 'female' : 'male'}`}>
                  <div className="mini-avatar-inner">{getInitial(s.name)}</div>
                </div>
                <div className="info">
                  <div className="name">{s.name}</div>
                  <div className="sub">{s.gender === 'female' ? 'أخت' : 'أخ'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SEARCH OVERLAY ====================
function SearchOverlay({ open, onClose, onNavigate }: { 
  open: boolean; 
  onClose: () => void; 
  onNavigate: (id: string) => void; 
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const matches = useMemo(() => {
    const q = query.trim();
    if (!q) return null;
    return getAllPeople().filter(p => {
      const hay = (p.name || '') + ' ' + (p.nickname || '');
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className={`search-overlay${open ? ' open' : ''}`}>
      <header className="search-header">
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          &#8592;
        </button>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="ابحث عن اسم..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </header>
      <div className="search-results">
        {matches === null && (
          <div className="search-empty">
            <div className="icon">&#128269;</div>
            <p>اكتب اسم شخص من العائلة</p>
          </div>
        )}
        {matches !== null && matches.length === 0 && (
          <div className="search-empty">
            <div className="icon">&#128533;</div>
            <p>لا توجد نتائج لـ &quot;{query}&quot;</p>
          </div>
        )}
        {matches !== null && matches.map(p => {
          const parent = p.parent ? people[p.parent] : null;
          const sub = parent ? `ابن/بنت ${shortenName(parent.name)}` : (p.nickname || '');
          return (
            <div
              key={p.id}
              className="search-person"
              onClick={() => { onClose(); onNavigate(p.id); }}
            >
              <div className={`mini-avatar ${p.gender === 'female' ? 'female' : 'male'}`}>
                <div className="mini-avatar-inner">{getInitial(p.name)}</div>
              </div>
              <div className="info">
                <div className="name">{p.name}</div>
                {sub && <div className="sub">{sub}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== ROOT COMPONENT ====================
export default function FamilyTreeApp() {
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  // Inject styles once
  useEffect(() => {
    const existing = document.getElementById('fm-family-styles');
    if (existing) return;

    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');

    // Add Google Fonts
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
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.id = 'fm-family-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);

  const handleSelectPerson = useCallback((id: string) => {
    const person = people[id];
    if (person) {
      setSelectedPerson(person);
      setDetailOpen(true);
    }
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const person = people[id];
    if (person) {
      setSelectedPerson(person);
    }
  }, []);

  const stats = useMemo(() => {
    const all = getAllPeople();
    return { total: all.length, deceased: all.filter((p: any) => p.deceased).length };
  }, []);

  return (
    <div className="fm-root">
      {/* Title Card */}
      <div className="title-card">
        <div className="tree-icon">
          <TreeIcon />
        </div>
        <div className="title-text">
          <h1>عائلة المقمر</h1>
          <p>شجرة العائلة الكريمة - {stats.total} فرد</p>
        </div>
      </div>

      {/* Tree Container */}
      <div className="tree-container">
        <TreeView onSelectPerson={handleSelectPerson} />
      </div>

      {/* Gradient Bar */}
      <div className="gradient-bar" />

      {/* Bottom Navigation */}
      <nav className="bottomnav">
        <button className="nav-btn active" onClick={() => { setSearchOpen(false); setDetailOpen(false); }}>
          <span className="nav-icon">&#127795;</span>
          <span>الشجرة</span>
        </button>
        <button className="nav-btn" onClick={() => handleSelectPerson('root')}>
          <span className="nav-icon">&#128081;</span>
          <span>الجد الأكبر</span>
        </button>
        <button className="nav-btn" onClick={() => setSearchOpen(true)}>
          <span className="nav-icon">&#128269;</span>
          <span>بحث</span>
        </button>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleSelectPerson}
      />

      {/* Detail Panel */}
      <DetailPanel
        person={selectedPerson}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
