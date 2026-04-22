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
    if (clean.startsWith(t + ' ')) { clean = clean.slice(t.length + 1); break; }
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

// ==================== STYLES ====================
const STYLES = `
:root {
  --male-color: #3B82F6;
  --male-color-light: #93C5FD;
  --female-color: #EC4899;
  --female-color-light: #F9A8D4;
  --couple-color: #10B981;
  --couple-color-light: #6EE7B7;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --bg-white: #FFFFFF;
  --bg-gray: #F3F4F6;
  --line-color: #9CA3AF;
  --heart-color: #10B981;
}

.fm-root * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
.fm-root { direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; background: var(--bg-white); }
html, body, #root { min-height: 100%; }
body {
  background: var(--bg-white);
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.5;
}

/* Header Title Card */
.title-card {
  position: fixed;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%);
  border-radius: 16px;
  padding: 16px 24px;
  color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(30, 58, 95, 0.25);
}

.title-card .tree-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-card .tree-icon svg {
  width: 40px;
  height: 40px;
  fill: #60A5FA;
}

.title-card .title-text h1 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 2px;
  font-family: 'Reem Kufi', 'Segoe UI', sans-serif;
}

.title-card .title-text p {
  font-size: 12px;
  opacity: 0.85;
}

/* Tree Container */
.tree-container {
  min-height: 100vh;
  padding: 100px 20px 80px;
  background: var(--bg-white);
  overflow-x: auto;
}

.tree-container::-webkit-scrollbar { width: 8px; height: 8px; }
.tree-container::-webkit-scrollbar-track { background: transparent; }
.tree-container::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 4px; }

/* Tree Node */
.tree-node-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Person Card */
.person-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 8px;
}

.person-node:hover {
  transform: scale(1.05);
}

.avatar-container {
  position: relative;
  margin-bottom: 6px;
}

.avatar-ring {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.avatar-ring.male {
  background: linear-gradient(135deg, var(--male-color), var(--male-color-light));
}

.avatar-ring.female {
  background: linear-gradient(135deg, var(--female-color), var(--female-color-light));
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
}

.person-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  max-width: 100px;
  line-height: 1.3;
}

.person-dates {
  font-size: 10px;
  text-align: center;
  margin-top: 2px;
}

.person-dates .deceased {
  color: var(--text-secondary);
}

.person-dates .alive {
  color: var(--couple-color);
  font-weight: 500;
}

/* Expand Button */
.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-gray);
  border: 2px solid var(--line-color);
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.2s;
  color: var(--text-secondary);
  font-size: 14px;
}

.expand-btn:hover {
  background: var(--male-color);
  border-color: var(--male-color);
  color: white;
}

.expand-btn.expanded {
  background: var(--male-color);
  border-color: var(--male-color);
  color: white;
  transform: rotate(180deg);
}

/* Children Container with Lines */
.children-wrapper {
  position: relative;
  margin-top: 8px;
  padding-top: 24px;
}

/* Vertical line from parent to horizontal line */
.children-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 24px;
  background: var(--line-color);
}

/* Heart at junction */
.junction-heart {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: var(--bg-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.junction-heart svg {
  width: 14px;
  height: 14px;
  fill: var(--heart-color);
}

/* Children Row with Horizontal Scrolling */
.children-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  position: relative;
  padding-top: 20px;
  overflow-x: auto;
  max-width: 100vw;
  padding-bottom: 8px;
}

.children-row::-webkit-scrollbar { height: 4px; }
.children-row::-webkit-scrollbar-track { background: transparent; }
.children-row::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }

/* Horizontal line connecting children */
.children-row::before {
  content: '';
  position: absolute;
  top: 0;
  height: 2px;
  background: var(--line-color);
  left: calc(50% - var(--line-width, 0px) / 2);
  width: var(--line-width, 0px);
}

/* Child Branch */
.child-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
}

/* Vertical line from horizontal line to child */
.child-branch::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: var(--line-color);
}

/* Heart on child branch */
.child-heart {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: var(--bg-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.child-heart svg {
  width: 10px;
  height: 10px;
  fill: var(--heart-color);
}

/* More Button */
.more-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  padding: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.more-btn-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--bg-gray), #E5E7EB);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-secondary);
  border: 3px solid var(--line-color);
  transition: all 0.2s;
}

.more-btn:hover .more-btn-circle {
  background: linear-gradient(135deg, var(--male-color-light), var(--male-color));
  color: white;
  border-color: var(--male-color);
}

.more-btn-text {
  font-size: 10px;
  color: var(--text-secondary);
  margin-top: 6px;
}

/* Bottom Navigation */
.bottomnav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--bg-white);
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
}

.nav-btn {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s;
  border-radius: 12px;
}

.nav-btn:hover {
  background: var(--bg-gray);
}

.nav-btn .nav-icon {
  font-size: 22px;
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
  background: var(--bg-white);
}

.search-input {
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #E5E7EB;
  border-radius: 30px;
  background: var(--bg-gray);
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  direction: rtl;
  font-family: inherit;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--male-color);
  background: var(--bg-white);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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

/* Person Card in Search/Details */
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
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
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
  background: var(--bg-white);
}

.back-btn, .icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-gray);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-primary);
  transition: all 0.2s;
}

.back-btn:hover, .icon-btn:hover {
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
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
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
  padding: 16px 20px;
  background: var(--bg-gray);
  border-radius: 16px;
  border-right: 4px solid var(--male-color);
  text-align: right;
  color: var(--text-secondary);
  line-height: 1.8;
}

.detail-section {
  margin-top: 28px;
}

.detail-section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.spouse-card {
  padding: 14px 18px;
  background: var(--bg-gray);
  border-radius: 14px;
  margin-bottom: 10px;
}

.spouse-card .spouse-name {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.spouse-card .spouse-note {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Gradient Bar */
.gradient-bar {
  position: fixed;
  bottom: 64px;
  left: 0;
  right: 0;
  height: 6px;
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

/* Responsive */
@media (max-width: 640px) {
  .title-card {
    right: 12px;
    left: 12px;
    top: 12px;
    padding: 12px 16px;
  }
  
  .title-card .tree-icon {
    width: 36px;
    height: 36px;
  }
  
  .title-card .tree-icon svg {
    width: 30px;
    height: 30px;
  }
  
  .title-card .title-text h1 {
    font-size: 15px;
  }
  
  .title-card .title-text p {
    font-size: 10px;
  }
  
  .tree-container {
    padding: 90px 12px 80px;
  }
  
  .avatar-ring {
    width: 52px;
    height: 52px;
  }
  
  .avatar-inner {
    font-size: 18px;
  }
  
  .person-name {
    font-size: 10px;
    max-width: 70px;
  }
  
  .person-dates {
    font-size: 8px;
  }
  
  .expand-btn {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  .children-row {
    gap: 8px;
  }
  
  .more-btn-circle {
    width: 52px;
    height: 52px;
    font-size: 14px;
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

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// ==================== PERSON NODE COMPONENT ====================
interface PersonNodeProps {
  person: any;
  onClick: () => void;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function PersonNode({ person, onClick, hasChildren, isExpanded, onToggleExpand }: PersonNodeProps) {
  return (
    <div className="person-node">
      <div className="avatar-container" onClick={onClick}>
        <div className={`avatar-ring ${person.gender === 'female' ? 'female' : 'male'}`}>
          <div className="avatar-inner">
            {getInitial(person.name)}
          </div>
        </div>
      </div>
      <div className="person-name" onClick={onClick}>
        {shortenName(person.name)}
      </div>
      <div className="person-dates">
        {person.deceased ? (
          <span className="deceased">رحمه الله</span>
        ) : (
          <span className="alive">حفظه الله</span>
        )}
      </div>
      {hasChildren && (
        <button 
          className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronDownIcon />
        </button>
      )}
    </div>
  );
}

// ==================== TREE NODE COMPONENT ====================
interface TreeNodeProps {
  person: any;
  onSelectPerson: (id: string) => void;
  expandedNodes: Set<string>;
  toggleExpand: (id: string) => void;
  visibleChildrenCount: { [key: string]: number };
  showMoreChildren: (id: string) => void;
  level?: number;
}

function TreeNode({ 
  person, 
  onSelectPerson, 
  expandedNodes, 
  toggleExpand,
  visibleChildrenCount,
  showMoreChildren,
  level = 0
}: TreeNodeProps) {
  const childrenIds = person.children || [];
  const children = childrenIds.map((id: string) => people[id]).filter(Boolean);
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(person.id);
  
  const visibleCount = visibleChildrenCount[person.id] || 5;
  const visibleChildren = children.slice(0, visibleCount);
  const remainingCount = children.length - visibleCount;
  const showMoreButton = remainingCount > 0 && isExpanded;

  // Calculate line width based on visible children
  const childRowRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);
  
  useEffect(() => {
    if (childRowRef.current && isExpanded && visibleChildren.length > 1) {
      const childElements = childRowRef.current.querySelectorAll('.child-branch');
      if (childElements.length >= 2) {
        const first = childElements[0] as HTMLElement;
        const last = childElements[childElements.length - 1] as HTMLElement;
        const firstCenter = first.offsetLeft + first.offsetWidth / 2;
        const lastCenter = last.offsetLeft + last.offsetWidth / 2;
        setLineWidth(Math.abs(lastCenter - firstCenter));
      }
    }
  }, [isExpanded, visibleChildren.length]);

  return (
    <div className="tree-node-wrapper">
      <PersonNode 
        person={person}
        onClick={() => onSelectPerson(person.id)}
        hasChildren={hasChildren}
        isExpanded={isExpanded}
        onToggleExpand={() => toggleExpand(person.id)}
      />
      
      {hasChildren && isExpanded && (
        <div className="children-wrapper">
          <div className="junction-heart">
            <HeartIcon />
          </div>
          
          <div 
            className="children-row" 
            ref={childRowRef}
            style={{ '--line-width': `${lineWidth}px` } as React.CSSProperties}
          >
            {visibleChildren.map((child: any) => (
              <div key={child.id} className="child-branch">
                <div className="child-heart">
                  <HeartIcon />
                </div>
                <TreeNode
                  person={child}
                  onSelectPerson={onSelectPerson}
                  expandedNodes={expandedNodes}
                  toggleExpand={toggleExpand}
                  visibleChildrenCount={visibleChildrenCount}
                  showMoreChildren={showMoreChildren}
                  level={level + 1}
                />
              </div>
            ))}
            
            {showMoreButton && (
              <div className="child-branch">
                <div className="child-heart">
                  <HeartIcon />
                </div>
                <div className="more-btn" onClick={() => showMoreChildren(person.id)}>
                  <div className="more-btn-circle">+{remainingCount}</div>
                  <span className="more-btn-text">عرض المزيد</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== TREE VIEW COMPONENT ====================
function TreeView({ onSelectPerson }: { onSelectPerson: (id: string) => void }) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const [visibleChildrenCount, setVisibleChildrenCount] = useState<{ [key: string]: number }>({});
  
  const root = people['root'];
  
  const toggleExpand = useCallback((id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const showMoreChildren = useCallback((id: string) => {
    setVisibleChildrenCount(prev => ({
      ...prev,
      [id]: (prev[id] || 5) + 5
    }));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minWidth: 'max-content', padding: '20px' }}>
      <TreeNode
        person={root}
        onSelectPerson={onSelectPerson}
        expandedNodes={expandedNodes}
        toggleExpand={toggleExpand}
        visibleChildrenCount={visibleChildrenCount}
        showMoreChildren={showMoreChildren}
      />
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
        <span style={{ fontWeight: 600, fontSize: 17 }}>تفاصيل الشخص</span>
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
              <div key={i} className="spouse-card">
                <div className="spouse-name">{s.name}</div>
                {s.note && <div className="spouse-note">{s.note}</div>}
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
