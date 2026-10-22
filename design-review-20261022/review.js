'use strict';
/* Public-safe visual sample only. No product engines, tracking, storage, or networking. */
(() => {
 const $=id=>document.getElementById(id);
 const dictionary={
  ar:{
   skip:'تجاوز إلى المحتوى',previewOnly:'معاينة تصميم فقط · دون شراء',
   navStart:'الرئيسية',navProducts:'المنتجان',navScreens:'الصور الأصلية',
   glassHeading:'غرفة العقد الزجاجية',
   beforeText:'مثال بصري مصطنع. اضغط لمشاهدة الاختلاف ثم التصحيح المحلي.',
   failText:'ظهر عدم التطابق في الرسم التوضيحي. اضغط لتشاهد نسخة محلية مصحّحة فقط.',
   localText:'هذه مقارنة داخل الرسم فقط، ولم نختبر أي نظام عميل أو إصلاح حقيقي.',
   reveal:'اكشف نقطة الخلل ↗',correct:'أظهر التصحيح المحلي ↗',reset:'أعد المثال ↗',
   seeProducts:'اكتشف المنتجين ↓',
   eyebrow:'تقنية تكشف موضع العطل قبل الوعود',
   headlineOne:'العطل له نقطة.',headlineTwo:'وللدليل حدّ.',
   lead:'شاهد تصميم NAIF Gravity الجديد كما سيبدو على الجوال. اختر المثال البصري، ثم اطّلع على المنتجين وصور الواجهة الحقيقية.',
   tagOne:'عربي وإنجليزي',tagTwo:'واضح على الجوال',tagThree:'بلا اشتراك تصميم',
   viewOriginal:'شاهد صور النسخة الأصلية ↗',
   heroBoundary:'هذه نسخة مراجعة بصرية آمنة؛ لا تتضمن محرك Mission Arena الخاص أو حماية Future Shield أو أي عمليات دفع.',
   stepOne:'01 — افهم المشكلة',stepTwo:'02 — شاهد المثال',stepThree:'03 — تعرّف على المنتج',
   productsHeading:'منتجان نطوّرهما. نتائج نختبرها.',
   productsIntro:'الواجهات التالية للتقييم والتصميم، وليست عروض بيع متاحة.',
   comingSoon:'COMING SOON · غير متاح للشراء',
   arenaSub:'أعد تشغيل الخلل قبل أن تنساه.',
   arenaDescription:'مقارنة محلية اصطناعية توضح مفهوم Replay Duel وBug Vaccine. لم نثبت إصلاح نظام حقيقي.',
   arenaNote:'نموذج العرض موجود داخليًا، وليس تشغيلًا إنتاجيًا.',
   plannedPrice:'سعر مخطط فقط',oneAgent:'وكيل واحد',fiveAgents:'حتى 5 وكلاء',
   seeArenaImage:'شاهد صورة التجربة ↗',
   shieldSub:'افهم الأثر قبل السماح بالفعل.',
   shieldDescription:'معاينة مفهوم فحص صلاحيات الوكيل قبل التنفيذ. لا يوجد هنا إنفاذ أمني حقيقي أو اتصال بخادم.',
   shieldNote:'المحاكاة فقط؛ الحماية الخارجية غير مثبتة.',
   seeShieldImage:'شاهد صورة المحاكاة ↗',
   screensHeading:'الصور الفعلية من نسخة Shadow',
   screensIntro:'هذه صور ملتقطة من Chromium وWebKit على الماك، وليست صورًا من آيفون فعلي. اضغط على أي صورة لتكبيرها.',
   shotOne:'أول شاشة — الزجاجات الثلاث',shotTwo:'بطاقتا المنتجين',
   shotThree:'تجربة Future Shield الاصطناعية',
   limitsTitle:'حدود العرض:',
   limits:'لا مدخلات عملاء، لا أدوات تتبّع أو طلبات API، ولا دفع أو إصلاح فعلي. الصوت اختياري ولا يُحفظ اختيارك أو يُرسل لأي جهة. المعاينة لا تحتوي على خوارزميات المنتجين الداخلية.',
   openSoundFile:'فتح ملف صوت M4A مباشرة ↗',
   footer:'مراجعة شكلية مستقلة — قرار النشر التجاري: NO-GO'
  },
  en:{
   skip:'Skip to content',previewOnly:'Design-only preview · no checkout',
   navStart:'Home',navProducts:'Products',navScreens:'Source screenshots',
   glassHeading:'The Glass Contract Chamber',
   beforeText:'Synthetic visual only. Tap to reveal a difference, then a local-only correction.',
   failText:'A mismatch is visible in the illustration. Tap to see the locally corrected sample.',
   localText:'This is a visual-only comparison. No real system was checked or repaired.',
   reveal:'Reveal the mismatch ↗',correct:'Show local correction ↗',reset:'Restart visual ↗',
   seeProducts:'Explore the products ↓',
   eyebrow:'Make the failure point visible — not a promise',
   headlineOne:'Failure has a point.',headlineTwo:'Proof has a boundary.',
   lead:'Preview the new NAIF Gravity design on mobile. Explore a simple visual sample, the two product cards and screenshots from the original Shadow build.',
   tagOne:'Arabic and English',tagTwo:'Mobile-first layout',tagThree:'No design subscription',
   viewOriginal:'View original screenshots ↗',
   heroBoundary:'This is a safe visual design review, not the private Mission Arena engine, the Future Shield enforcement system, or a payment flow.',
   stepOne:'01 — Find the issue',stepTwo:'02 — Explore a sample',stepThree:'03 — Understand the product',
   productsHeading:'Two products in development. Evidence in progress.',
   productsIntro:'These interfaces are for design evaluation, not live purchasing.',
   comingSoon:'COMING SOON · not for sale',
   arenaSub:'Replay a failure before it fades.',
   arenaDescription:'A local synthetic comparison illustrating Replay Duel and Bug Vaccine. No live system repair has been demonstrated.',
   arenaNote:'A separate internal prototype exists; no production operation is implied.',
   plannedPrice:'Planned price only',oneAgent:'One agent',fiveAgents:'Up to 5 agents',
   seeArenaImage:'View the experiment screenshot ↗',
   shieldSub:'Inspect an action before allowing it.',
   shieldDescription:'Visual concept for checking agent permissions before execution. No real enforcement or server access here.',
   shieldNote:'Simulation only; external protection remains unproven.',
   seeShieldImage:'View simulation screenshot ↗',
   screensHeading:'Screenshots from the actual Shadow build',
   screensIntro:'These were captured on macOS Chromium and WebKit, not a physical iPhone. Tap an image to view the original size.',
   shotOne:'First screen — the three glass plates',shotTwo:'Both product cards',
   shotThree:'Synthetic Future Shield demonstration',
   limitsTitle:'Review limits:',
   limits:'No customer inputs, tracking, API calls, payment or real repair. Audio is optional, with no saved preference or data transfer. No private product logic is included.',
   openSoundFile:'Open the M4A audio file directly ↗',
   footer:'Standalone design review — commercial release NO-GO'
  }
 };
 const phases=['BEFORE','FAIL','CORRECTED_LOCAL'];
 let phase=0;
 let lang='ar';
 function paint(){
  const t=dictionary[lang];
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  for(const node of document.querySelectorAll('[data-t]')){
   const k=node.dataset.t;
   if(Object.prototype.hasOwnProperty.call(t,k))node.textContent=t[k];
  }
  const current=phases[phase];
  $('glassChamber').dataset.phase=current;
  $('glassPhase').textContent=current;
  $('glassExplain').textContent=t[phase===0?'beforeText':phase===1?'failText':'localText'];
  $('glassAction').textContent=t[phase===0?'reveal':phase===1?'correct':'reset'];
  $('localGlyph').textContent=phase===2?'✓':'◎';
  const lng=$('langToggle');
  lng.textContent=lang==='ar'?'EN ↗':'AR ↗';
  lng.setAttribute('aria-label',lang==='ar'?'EN — switch to English':'AR — التحويل إلى العربية');
 }
 $('glassAction')?.addEventListener('click',()=>{phase=(phase+1)%phases.length;paint();});
 $('langToggle')?.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';paint();window.dispatchEvent(new Event('naif:preview-language-changed'));});
 paint();
})();
