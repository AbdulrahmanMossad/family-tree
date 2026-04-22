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
  return clean.split(/\s+/).slice(0, 2).join(' ');
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

// ==================== STYLES (injected once) ====================
const STYLES = `
:root {
  --ink: #2b1810;
  --ink-soft: #4a3529;
  --paper: #faf3e7;
  --paper-warm: #f4e8d1;
  --paper-deep: #ecdfc3;
  --gold: #b08d3f;
  --gold-deep: #8a6a25;
  --gold-light: #d4b76a;
  --olive: #5a6a3e;
  --rust: #a0451f;
  --shadow: rgba(43, 24, 16, 0.12);
  --shadow-deep: rgba(43, 24, 16, 0.25);
  --line: #d9c9a8;
}
.fm-root * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
.fm-root { direction: rtl; }
html, body, #root { height: 100%; overscroll-behavior: none; }
body {
  font-family: 'Markazi Text', 'Amiri', serif;
  background: var(--paper);
  color: var(--ink);
  font-size: 18px;
  line-height: 1.6;
  overflow: hidden;
  background-image:
    radial-gradient(circle at 15% 15%, rgba(176, 141, 63, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(160, 69, 31, 0.06) 0%, transparent 45%);
  position: fixed;
  inset: 0;
}
.topbar {
  position: fixed; top: 0; left: 0; right: 0; height: 60px;
  background: rgba(250, 243, 231, 0.92);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px; z-index: 50;
}
.topbar-title {
  font-family: 'Reem Kufi', sans-serif; font-weight: 700; font-size: 20px;
  color: var(--ink); display: flex; align-items: center; gap: 10px;
}
.topbar-title::before { content: "❋"; color: var(--gold); font-size: 18px; }
.icon-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: transparent; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; color: var(--ink); transition: all 0.2s;
}
.icon-btn:hover { background: var(--paper-warm); }
.icon-btn:active { transform: scale(0.92); }
.icon-btn.hidden { visibility: hidden; }

.stage {
  position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
  overflow-y: auto; overflow-x: hidden;
  padding: 24px 16px 100px;
  -webkit-overflow-scrolling: touch;
}
.stage::-webkit-scrollbar { width: 6px; }
.stage::-webkit-scrollbar-track { background: transparent; }
.stage::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
.stage.has-trail { top: 110px; padding-top: 20px; }

.stage-inner {
  max-width: 560px; margin: 0 auto;
  animation: fadeSlide 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.view-transition-out { animation: fadeOut 0.2s forwards; }
@keyframes fadeOut { to { opacity: 0; transform: translateY(-10px); } }

.hero {
  background: linear-gradient(160deg, #fffdf7 0%, var(--paper-warm) 100%);
  border-radius: 24px; padding: 36px 28px 32px;
  box-shadow: 0 12px 40px var(--shadow-deep), 0 0 0 1px var(--line);
  text-align: center; position: relative; overflow: hidden; margin-bottom: 24px;
}
.hero::before {
  content: ""; position: absolute; top: -60px; right: -60px;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(176, 141, 63, 0.15), transparent);
  border-radius: 50%;
}
.hero::after {
  content: ""; position: absolute; bottom: -80px; left: -60px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(160, 69, 31, 0.08), transparent);
  border-radius: 50%;
}
.avatar-ring {
  width: 120px; height: 120px; border-radius: 50%;
  margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
  position: relative;
  background: linear-gradient(135deg, var(--gold-light), var(--gold-deep));
  padding: 4px; box-shadow: 0 8px 24px rgba(176, 141, 63, 0.3);
}
.avatar {
  width: 100%; height: 100%; border-radius: 50%;
  background: var(--paper);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Reem Kufi', sans-serif; font-weight: 600; font-size: 42px; color: var(--ink);
}
.avatar.female { background: linear-gradient(135deg, #fff, #f5e4d4); }
.avatar.male { background: linear-gradient(135deg, #fff, #e8ebd9); }
.status-dot {
  position: absolute; bottom: 8px; left: 8px;
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--paper);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; box-shadow: 0 2px 6px var(--shadow); color: var(--gold-deep);
}
.hero-name {
  font-family: 'Reem Kufi', sans-serif; font-size: 26px; font-weight: 700;
  color: var(--ink); line-height: 1.35; margin-bottom: 6px; position: relative;
}
.hero-nickname {
  font-family: 'Amiri', serif; font-size: 17px; font-style: italic;
  color: var(--gold-deep); position: relative;
}
.hero-meta {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 10px; margin-inline-end: 6px;
  padding: 5px 14px; border-radius: 20px;
  background: rgba(176, 141, 63, 0.12);
  font-size: 14px; color: var(--gold-deep);
  font-family: 'Amiri', serif; position: relative;
}
.hero-note {
  margin-top: 18px; padding: 14px 16px;
  background: rgba(255, 255, 255, 0.6); border-radius: 14px;
  border-right: 3px solid var(--gold);
  font-size: 16px; color: var(--ink-soft); text-align: right;
  line-height: 1.7; position: relative;
}

.rel-section { margin-bottom: 20px; }
.rel-title {
  font-family: 'Reem Kufi', sans-serif; font-size: 15px; font-weight: 600;
  color: var(--gold-deep); margin: 0 4px 10px;
  display: flex; align-items: center; gap: 8px;
}
.rel-title::after {
  content: ""; flex: 1; height: 1px;
  background: linear-gradient(to left, var(--line), transparent);
}
.rel-count {
  background: var(--paper-warm); color: var(--gold-deep);
  padding: 1px 10px; border-radius: 10px; font-size: 12px;
}

.person-btn {
  width: 100%; display: flex; align-items: center; gap: 14px;
  padding: 14px 16px; background: #fffdf7;
  border: 1px solid var(--line); border-radius: 16px;
  cursor: pointer; text-align: right;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 8px; font-family: inherit;
  position: relative; box-shadow: 0 1px 3px var(--shadow);
}
.person-btn:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 18px var(--shadow);
  border-color: var(--gold-light); background: #fff;
}
.person-btn:active { transform: scale(0.98); }
.mini-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  background: linear-gradient(135deg, var(--paper-warm), var(--paper-deep));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Reem Kufi', sans-serif; font-weight: 600; font-size: 20px;
  color: var(--ink); flex-shrink: 0;
  border: 2px solid var(--paper); box-shadow: 0 2px 6px var(--shadow);
  position: relative;
}
.mini-avatar.male { background: linear-gradient(135deg, #f0f2e0, #d9e0c2); }
.mini-avatar.female { background: linear-gradient(135deg, #fce4d0, #f4c9a8); }
.mini-avatar.deceased::after {
  content: "۞"; position: absolute; bottom: -2px; left: -2px;
  font-size: 12px; color: var(--gold-deep);
  background: var(--paper); border-radius: 50%;
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--line);
}
.person-btn .info { flex: 1; min-width: 0; }
.person-btn .p-name {
  font-family: 'Reem Kufi', sans-serif; font-weight: 600; font-size: 16px;
  color: var(--ink); margin-bottom: 2px; line-height: 1.3;
}
.person-btn .p-sub {
  font-family: 'Amiri', serif; font-size: 13px; color: var(--gold-deep);
  font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.person-btn .chevron {
  color: var(--gold); font-size: 20px; flex-shrink: 0; transition: transform 0.2s;
}
.person-btn:hover .chevron { transform: translateX(-3px); }

.info-list {
  background: #fffdf7; border: 1px solid var(--line);
  border-radius: 16px; padding: 4px 0; box-shadow: 0 1px 3px var(--shadow);
}
.info-item {
  padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px;
  border-bottom: 1px dashed var(--line);
}
.info-item:last-child { border-bottom: none; }
.info-item .icon { color: var(--gold); font-size: 18px; margin-top: 2px; }
.info-item .text { flex: 1; font-size: 16px; color: var(--ink); line-height: 1.5; }
.info-item .sub {
  font-size: 13px; color: var(--gold-deep); margin-top: 2px;
  font-family: 'Amiri', serif; font-style: italic;
}

.trail {
  position: fixed; top: 60px; left: 0; right: 0;
  background: rgba(250, 243, 231, 0.95);
  backdrop-filter: blur(10px); border-bottom: 1px solid var(--line);
  padding: 10px 16px; z-index: 40;
  display: flex; gap: 6px; align-items: center;
  overflow-x: auto; white-space: nowrap;
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.trail::-webkit-scrollbar { display: none; }
.trail.hidden { display: none; }
.trail-item {
  background: transparent; border: 1px solid var(--line);
  color: var(--ink-soft); padding: 4px 12px; border-radius: 14px;
  font-size: 13px; font-family: 'Reem Kufi', sans-serif;
  cursor: pointer; flex-shrink: 0; transition: all 0.2s;
}
.trail-item:hover { background: var(--paper-warm); }
.trail-item.current {
  background: var(--ink); color: var(--paper); border-color: var(--ink);
}
.trail-separator { color: var(--gold); flex-shrink: 0; font-size: 12px; }

.bottomnav {
  position: fixed; bottom: 0; left: 0; right: 0; height: 72px;
  background: rgba(250, 243, 231, 0.95);
  backdrop-filter: blur(14px); border-top: 1px solid var(--line);
  display: flex; justify-content: space-around; align-items: center;
  padding: 0 8px 6px; z-index: 50;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
}
.nav-btn {
  background: transparent; border: none;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 8px 14px; cursor: pointer; color: var(--ink-soft);
  font-family: 'Reem Kufi', sans-serif; font-size: 12px; font-weight: 500;
  transition: all 0.2s; border-radius: 12px; min-width: 64px;
}
.nav-btn:hover { background: var(--paper-warm); }
.nav-btn .nav-icon { font-size: 22px; line-height: 1; }
.nav-btn.active { color: var(--gold-deep); }
.nav-btn.active .nav-icon { transform: scale(1.1); }

.search-overlay, .about-overlay {
  position: fixed; inset: 0; background: var(--paper); z-index: 100;
  display: none; flex-direction: column; padding-bottom: 72px;
}
.search-overlay.open, .about-overlay.open { display: flex; animation: fadeIn 0.25s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.search-header, .about-header {
  padding: 16px; background: var(--paper);
  border-bottom: 1px solid var(--line);
  display: flex; gap: 10px; align-items: center;
}
.search-input {
  flex: 1; padding: 12px 18px;
  border: 1.5px solid var(--line); border-radius: 24px;
  background: #fff; font-family: inherit; font-size: 18px;
  color: var(--ink); outline: none; direction: rtl;
}
.search-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgba(176, 141, 63, 0.1);
}
.search-results { flex: 1; overflow-y: auto; padding: 16px; }
.search-empty {
  text-align: center; padding: 60px 20px;
  color: var(--gold-deep); font-family: 'Amiri', serif;
  font-style: italic; font-size: 17px;
}
.search-empty .big-icon {
  font-size: 64px; display: block; margin-bottom: 16px; opacity: 0.3;
}
.about-content { flex: 1; overflow-y: auto; padding: 20px 20px 40px; }
.about-inner { max-width: 620px; margin: 0 auto; }
.about-inner h2 {
  font-family: 'Reem Kufi', sans-serif; color: var(--ink);
  font-size: 28px; margin-bottom: 6px;
}
.about-inner h3 {
  font-family: 'Reem Kufi', sans-serif; color: var(--gold-deep);
  font-size: 20px; margin: 24px 0 10px;
  display: flex; align-items: center; gap: 8px;
}
.about-inner h3::before { content: "❋"; color: var(--gold); }
.about-inner p { margin-bottom: 12px; line-height: 1.9; }
.about-inner .quote {
  font-family: 'Amiri', serif; font-style: italic;
  background: var(--paper-warm); padding: 16px 20px;
  border-radius: 12px; border-right: 3px solid var(--gold);
  margin: 18px 0; font-size: 17px;
}
.stat-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px; margin: 16px 0;
}
.stat-card {
  background: #fffdf7; border: 1px solid var(--line);
  border-radius: 14px; padding: 14px; text-align: center;
}
.stat-card .num {
  font-family: 'Reem Kufi', sans-serif; font-size: 28px;
  font-weight: 700; color: var(--gold-deep);
}
.stat-card .lbl {
  font-size: 13px; color: var(--ink-soft); font-family: 'Amiri', serif;
}

.welcome { text-align: center; padding: 30px 0 20px; }
.welcome .greeting {
  font-family: 'Amiri', serif; color: var(--gold-deep);
  font-style: italic; font-size: 16px; margin-bottom: 4px;
}
.welcome .welcome-title {
  font-family: 'Reem Kufi', sans-serif; font-size: 30px; font-weight: 700;
  color: var(--ink); line-height: 1.3;
}
.welcome .ornament { color: var(--gold); margin: 12px 0; letter-spacing: 12px; }

.cta-card {
  background: linear-gradient(145deg, var(--ink), var(--ink-soft));
  color: var(--paper); border-radius: 20px; padding: 24px;
  text-align: right; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(43, 24, 16, 0.2);
  position: relative; overflow: hidden; margin-bottom: 16px;
  border: none; width: 100%; font-family: inherit;
}
.cta-card::before {
  content: ""; position: absolute; top: -40px; left: -40px;
  width: 140px; height: 140px;
  background: radial-gradient(circle, rgba(176, 141, 63, 0.25), transparent);
  border-radius: 50%;
}
.cta-card:active { transform: scale(0.98); }
.cta-card .label {
  font-family: 'Amiri', serif; color: var(--gold-light);
  font-size: 14px; font-style: italic; margin-bottom: 6px; position: relative;
}
.cta-card .title {
  font-family: 'Reem Kufi', sans-serif; font-size: 22px;
  font-weight: 700; margin-bottom: 4px; position: relative;
}
.cta-card .subtitle { font-size: 15px; opacity: 0.8; position: relative; }
.cta-card .arrow {
  position: absolute; left: 20px; top: 50%;
  transform: translateY(-50%); font-size: 24px; color: var(--gold-light);
}

.quick-links {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 10px; margin-top: 20px;
}
.quick-link {
  background: #fffdf7; border: 1px solid var(--line);
  padding: 16px 14px; border-radius: 14px;
  cursor: pointer; text-align: center; transition: all 0.2s;
  font-family: 'Reem Kufi', sans-serif;
}
.quick-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px var(--shadow);
  border-color: var(--gold-light);
}
.quick-link .ql-icon { font-size: 24px; display: block; margin-bottom: 6px; }
.quick-link .ql-name { font-size: 14px; font-weight: 600; color: var(--ink); }
.quick-link .ql-desc { font-size: 12px; color: var(--gold-deep); margin-top: 2px; }

@media (max-width: 480px) {
  .hero { padding: 28px 20px 24px; border-radius: 20px; }
  .hero-name { font-size: 22px; }
  .avatar-ring { width: 100px; height: 100px; }
  .avatar { font-size: 36px; }
  .person-btn { padding: 12px 14px; }
  .mini-avatar { width: 44px; height: 44px; font-size: 18px; }
  .person-btn .p-name { font-size: 15px; }
  .stage { padding: 20px 14px 100px; }
  .welcome .welcome-title { font-size: 24px; }
  .cta-card { padding: 20px; }
  .cta-card .title { font-size: 18px; }
}
@media (hover: none) {
  .person-btn:hover { transform: none; }
}
`;

// ==================== SUB-COMPONENTS ====================
function PersonButton({ person, label, subtext, onClick }: { person: any; label?: any; subtext?: any; onClick: () => void }) {
  const avatarClass = person.gender === 'female' ? 'female' : 'male';
  const deceased = person.deceased ? ' deceased' : '';
  const sub = label || subtext || person.nickname || '';

  return (
    <button className="person-btn" onClick={onClick}>
      <div className={`mini-avatar ${avatarClass}${deceased}`}>{getInitial(person.name)}</div>
      <div className="info">
        <div className="p-name">{person.name}</div>
        {sub && <div className="p-sub">{sub}</div>}
      </div>
      <span className="chevron">‹</span>
    </button>
  );
}

function PersonView({ person, onNavigate }: { person: any; onNavigate: (id: string) => void }) {
  const parent = person.parent ? people[person.parent] : null;
  const mother = person.motherName;
  const siblings = getSiblings(person.id);
  const children = (person.children || []).map((cid: string) => people[cid]).filter(Boolean);
  const spouses = person.spouses || [];

  const avatarClass = person.gender === 'female' ? 'female' : 'male';
  const statusIcon = person.deceased ? '۞' : '❋';

  return (
    <>
      <div className="hero">
        <div className="avatar-ring">
          <div className={`avatar ${avatarClass}`}>{getInitial(person.name)}</div>
          <div className="status-dot">{statusIcon}</div>
        </div>
        <h1 className="hero-name">{person.name}</h1>
        {person.nickname && <div className="hero-nickname">{person.nickname}</div>}
        <div style={{ marginTop: 4 }}>
          {person.deceased && (
            <div className="hero-meta">🤲 {person.gender === 'female' ? 'رحمة الله عليها' : 'رحمة الله عليه'}</div>
          )}
          {mother && <div className="hero-meta">👩 من الأم: {mother}</div>}
        </div>
        {person.note && <div className="hero-note">{person.note}</div>}
      </div>

      {parent && (
        <div className="rel-section">
          <div className="rel-title">{parent.gender === 'female' ? 'الأم' : 'الأب'}</div>
          <PersonButton
            person={parent}
            label={parent.gender === 'female' ? 'الأم' : 'الأب'}
            onClick={() => onNavigate(parent.id)}
          />
        </div>
      )}

      {spouses.length > 0 && (
        <div className="rel-section">
          <div className="rel-title">
            {person.gender === 'female' ? 'الزوج' : (spouses.length > 1 ? 'الزوجات' : 'الزوجة')}
            <span className="rel-count">{spouses.length}</span>
          </div>
          <div className="info-list">
            {spouses.map((s: any, i: number) => (
              <div className="info-item" key={i}>
                <span className="icon">💍</span>
                <div className="text">
                  {s.name}
                  {s.note && <div className="sub">{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {children.length > 0 && (
        <div className="rel-section">
          <div className="rel-title">الأبناء <span className="rel-count">{children.length}</span></div>
          {children.map((c: any) => {
            const ccount = (c.children || []).length;
            const subtext = ccount > 0 ? `${ccount} ${ccount === 1 ? 'ابن/بنت' : 'أبناء'}` : '';
            return (
              <PersonButton
                key={c.id}
                person={c}
                subtext={subtext || c.nickname}
                onClick={() => onNavigate(c.id)}
              />
            );
          })}
        </div>
      )}

      {siblings.length > 0 && (
        <div className="rel-section">
          <div className="rel-title">الإخوة والأخوات <span className="rel-count">{siblings.length}</span></div>
          {siblings.map((s: any) => (
            <PersonButton
              key={s.id}
              person={s}
              subtext={s.gender === 'female' ? 'أخت' : 'أخ'}
              onClick={() => onNavigate(s.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function HomeView({ onNavigate, onOpenSearch, onOpenAbout }: { onNavigate: (id: string) => void; onOpenSearch: () => void; onOpenAbout: () => void }) {
  return (
    <>
      <div className="welcome">
        <div className="greeting">أهلاً وسهلاً بك في</div>
        <div className="welcome-title">عائلة المقمر الكريمة</div>
        <div className="ornament">❋ ❋ ❋</div>
      </div>

      <button className="cta-card" onClick={() => onNavigate('root')}>
        <div className="label">ابدأ من البداية</div>
        <div className="title">الحاج مصطفى علي المقمر</div>
        <div className="subtitle">الجد الأكبر — من هنا تبدأ الحكاية</div>
        <div className="arrow">←</div>
      </button>

      <button
        className="cta-card"
        onClick={() => onNavigate('bohaira-root')}
        style={{ background: 'linear-gradient(145deg, var(--gold-deep), var(--rust))' }}
      >
        <div className="label">فرع البحيرة</div>
        <div className="title">أبو حمص وإدكو</div>
        <div className="subtitle">أبناء العم  في البحيرة</div>
        <div className="arrow">←</div>
      </button>

      <div className="quick-links">
        <div className="quick-link" onClick={onOpenSearch}>
          <span className="ql-icon">🔍</span>
          <div className="ql-name">ابحث عن فرد</div>
          <div className="ql-desc">اكتب أي اسم</div>
        </div>
        <div className="quick-link" onClick={onOpenAbout}>
          <span className="ql-icon">📖</span>
          <div className="ql-name">قصة العائلة</div>
          <div className="ql-desc">الأصل والتاريخ</div>
        </div>
        <div className="quick-link" onClick={() => onNavigate('ahmed-abdelazeem')}>
          <span className="ql-icon">⭐</span>
          <div className="ql-name">أبو أحمد</div>
          <div className="ql-desc">جامع الشمل</div>
        </div>
        <div className="quick-link" onClick={() => onNavigate('mohamed-ahmed')}>
          <span className="ql-icon">🌿</span>
          <div className="ql-name">عميد العائلة</div>
          <div className="ql-desc">الحاج محمد أحمد</div>
        </div>
      </div>
    </>
  );
}

function Breadcrumb({ currentId, onNavigate }: { currentId: string; onNavigate: (id: string) => void }) {
  const chain = useMemo(() => buildAncestry(currentId), [currentId]);
  const trailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (trailRef.current) {
      setTimeout(() => { if (trailRef.current) trailRef.current.scrollLeft = 0; }, 50);
    }
  }, [currentId]);

  if (chain.length <= 1) return null;

  return (
    <div className="trail" ref={trailRef}>
      <button className="trail-item" onClick={() => onNavigate('home')}>🏠</button>
      {chain.map((p, i) => (
        <React.Fragment key={p.id}>
          <span className="trail-separator">‹</span>
          <button
            className={`trail-item ${i === chain.length - 1 ? 'current' : ''}`}
            onClick={() => onNavigate(p.id)}
          >
            {shortenName(p.name)}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

function SearchOverlay({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (id: string) => void }) {
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
        <button className="icon-btn" onClick={onClose} aria-label="إغلاق">←</button>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="اكتب اسم شخص من العيلة..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </header>
      <div className="search-results">
        {matches === null && (
          <div className="search-empty">
            <span className="big-icon">🔍</span>
            اكتب اسم من العيلة<br />
            <small style={{ opacity: 0.7, fontSize: 14 }}>مثال: أحمد، فاطمة، نادية...</small>
          </div>
        )}
        {matches !== null && matches.length === 0 && (
          <div className="search-empty">
            <span className="big-icon">😔</span>
            لا توجد نتائج لـ "{query}"<br />
            <small style={{ opacity: 0.7, fontSize: 14 }}>جرّب جزء من الاسم فقط</small>
          </div>
        )}
        {matches !== null && matches.map(p => {
          const parent = p.parent ? people[p.parent] : null;
          const sub = parent ? `ابن/بنت ${shortenName(parent.name)}` : (p.nickname || '');
          return (
            <PersonButton
              key={p.id}
              person={p}
              subtext={sub}
              onClick={() => { onClose(); onNavigate(p.id); }}
            />
          );
        })}
      </div>
    </div>
  );
}

function AboutOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const stats = useMemo(() => {
    const all = getAllPeople();
    return { total: all.length, deceased: all.filter((p: any) => p.deceased).length };
  }, []);

  return (
    <div className={`about-overlay${open ? ' open' : ''}`}>
      <header className="about-header">
        <button className="icon-btn" onClick={onClose} aria-label="إغلاق">←</button>
        <div className="topbar-title" style={{ flex: 1 }}>عن العائلة</div>
      </header>
      <div className="about-content">
        <div className="about-inner">
          <h2>عائلة المقمر</h2>
          <p style={{ color: 'var(--gold-deep)', fontStyle: 'italic', marginTop: 4 }}>
            صلة الرحم بيننا هبة من الله
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="num">{stats.total}</div>
              <div className="lbl">فرد في الشجرة</div>
            </div>
            <div className="stat-card">
              <div className="num">٤</div>
              <div className="lbl">أجيال</div>
            </div>
            <div className="stat-card">
              <div className="num">{stats.deceased}</div>
              <div className="lbl">في ذمة الله</div>
            </div>
          </div>

         <div className="quote">
  الهدف من هذا الجمع هو التعارف والتواصل والتراحم وصلة الرحم بين أبناء عائلة المقمر الكريمة، المعروفة سابقًا باسم أبو عمرية، حسب رواية الحاج عبدالعزيز المقمر رحمه الله  .
</div>

          <h3>أصل العائلة</h3>
          <p>
            عائلة المقمر عائلة عريقة، جذورها تمتد في مدينة زفتي وقراها، ومنها فروع في محافظة البحيرة (أبو حمص وإدكو ودمنهور وكفر الدوار)، وفي بورسعيد، والإسكندرية، وأسوان، والفيوم، وخارج مصر.
          </p>
          <p>
            الجد الأكبر الموثق لدينا هو <strong>الحاج مصطفى علي المقمر</strong> رحمة الله عليه، توفي سنة 1949، وله ذرية كثيرة من عدة زوجات، انتشرت في أنحاء الجمهورية.
          </p>

          <h3>تسمية المقمر</h3>
          <p>
            هناك روايات عن سبب تسمية العائلة بهذا الاسم. من أشهرها رواية العيش المقمر الذي كان يُقدم للعمال أثناء البناء، فكانوا يقولون "المقمر جه". وبعض أبناء البحيرة يرجع النسب إلى آل المنير من الأشراف نسبة للحسين رضي الله عنه.
          </p>

          <h3>قيم العائلة</h3>
          <p>
            هذه العائلة مبنية على الود والاحترام وصلة الرحم، ومن تقاليدها الاجتماع على الخير، والوقوف جنب بعض في الأفراح والأحزان. وكان للأجداد <strong>"صندوق العائلة"</strong> الذي كانوا يساعدون به من يمر بظروف قهرية.
          </p>

          <h3>فضل جامع الشمل</h3>
          <p>
            الحاج <strong>أحمد عبد العظيم المقمر</strong> (أبو أحمد) له الفضل بعد الله في إنشاء جروب العائلة الذي جمع شمل أفرادها، وأعاد التواصل بين فروعها المتفرقة.
          </p>

          <div className="quote" style={{ textAlign: 'center' }}>
            اللهم اغفر لمن سبقونا من هذه العائلة الطيبة،<br />
            وبارك لنا فيمن بقي،<br />
            واجعل صلة الرحم في ميزان حسناتنا جميعاً
            <br /><br />
            <small style={{ color: 'var(--gold-deep)' }}>— اللهم آمين</small>
          </div>

          <h3>عن هذا الموقع</h3>
          <p>
            تم جمع بيانات هذه الشجرة من محادثات جروب العائلة، ومن الأوراق التي كتبها بخط يده الحاج عبد العزيز مصطفى المقمر رحمه الله، ومن شهادات الأجداد والكبار. ولو لاحظت معلومة ناقصة أو تحتاج تصحيح، فاطلب من الأهل إضافتها.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== ROOT ====================
export default function FamilyTreeApp() {
  const [currentId, setCurrentId] = useState('home');
  const [history, setHistory] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pendingNavRef = useRef<string | null>(null);

  // Inject fonts + styles once
  useEffect(() => {
    const existing = document.getElementById('fm-family-styles');
    if (existing) return;

    // RTL on document
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');

    // Preconnect + font link
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
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Markazi+Text:wght@400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Stylesheet
    const style = document.createElement('style');
    style.id = 'fm-family-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);

  const navigate = useCallback((id: string) => {
    setTransitioning(true);
    pendingNavRef.current = id;
    setTimeout(() => {
      setHistory(prev => {
        if (currentId !== id && currentId !== 'home') return [...prev, currentId];
        return prev;
      });
      setCurrentId(id);
      setTransitioning(false);
      if (stageRef.current) stageRef.current.scrollTop = 0;
    }, 180);
  }, [currentId]);

  const goBack = useCallback(() => {
    if (searchOpen) { setSearchOpen(false); return; }
    if (aboutOpen) { setAboutOpen(false); return; }
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setTransitioning(true);
      setTimeout(() => {
        setCurrentId(prev);
        setTransitioning(false);
        if (stageRef.current) stageRef.current.scrollTop = 0;
      }, 180);
    } else if (currentId !== 'home') {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentId('home');
        setTransitioning(false);
      }, 180);
    }
  }, [history, currentId, searchOpen, aboutOpen]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goBack();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goBack]);

  // Swipe to go back
  useEffect(() => {
    let startX = 0, startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = Math.abs(e.changedTouches[0].clientY - startY);
      if (dx < -80 && dy < 50 && startX < 40 && currentId !== 'home') {
        goBack();
      }
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
    };
  }, [currentId, goBack]);

  const person = currentId !== 'home' ? (people as any)[currentId] : null;
  const isHome = currentId === 'home';
  const showTrail = !isHome && person && buildAncestry(currentId).length > 1;

  // Active nav logic
  let activeNav = null;
  if (searchOpen) activeNav = 'search';
  else if (aboutOpen) activeNav = 'about';
  else if (isHome) activeNav = 'home';
  else if (currentId === 'root') activeNav = 'root';

  return (
    <div className="fm-root">
      <header className="topbar">
        <button
          className={`icon-btn${isHome ? ' hidden' : ''}`}
          onClick={goBack}
          aria-label="رجوع"
        >←</button>
        <div className="topbar-title">عائلة المقمر</div>
        <button
          className="icon-btn"
          onClick={() => navigate('home')}
          aria-label="الرئيسية"
        >🏠</button>
      </header>

      {showTrail && <Breadcrumb currentId={currentId} onNavigate={navigate} />}

      <main className={`stage${showTrail ? ' has-trail' : ''}`} ref={stageRef}>
        <div className={`stage-inner${transitioning ? ' view-transition-out' : ''}`}>
          {isHome ? (
            <HomeView
              onNavigate={navigate}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenAbout={() => setAboutOpen(true)}
            />
          ) : person ? (
            <PersonView person={person} onNavigate={navigate} />
          ) : (
            <HomeView
              onNavigate={navigate}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenAbout={() => setAboutOpen(true)}
            />
          )}
        </div>
      </main>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
      <AboutOverlay
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <nav className="bottomnav">
        <button
          className={`nav-btn${activeNav === 'home' ? ' active' : ''}`}
          onClick={() => { setSearchOpen(false); setAboutOpen(false); navigate('home'); }}
        >
          <span className="nav-icon">🏠</span>
          <span>الرئيسية</span>
        </button>
        <button
          className={`nav-btn${activeNav === 'root' ? ' active' : ''}`}
          onClick={() => { setSearchOpen(false); setAboutOpen(false); navigate('root'); }}
        >
          <span className="nav-icon">🌳</span>
          <span>الجد الأكبر</span>
        </button>
        <button
          className={`nav-btn${activeNav === 'search' ? ' active' : ''}`}
          onClick={() => { setAboutOpen(false); setSearchOpen(true); }}
        >
          <span className="nav-icon">🔍</span>
          <span>بحث</span>
        </button>
        <button
          className={`nav-btn${activeNav === 'about' ? ' active' : ''}`}
          onClick={() => { setSearchOpen(false); setAboutOpen(true); }}
        >
          <span className="nav-icon">📖</span>
          <span>القصة</span>
        </button>
      </nav>
    </div>
  );
}
