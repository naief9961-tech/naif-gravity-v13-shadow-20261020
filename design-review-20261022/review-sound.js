'use strict';
/**
 * Original NAIF Gravity Crystal Whisper sound, rendered in native HTML audio
 * instead of Web Audio to address iPhone silent-switch output behavior.
 * Files preserve 1680/2510/3560 Hz sine frequencies, phase pitch ratios,
 * original exponential attack/decay and relative volumes, with a constant
 * normalization for mobile audibility. All files self-hosted and synthetic.
 * No autoplay, no telemetry, no personal-data transfer, no external APIs.
 */
(() => {
  const $=id=>document.getElementById(id);
  const button=$('glassSoundToggle');
  const label=$('glassSoundLabel');
  const help=$('glassSoundHelp');
  const glass=$('glassChamber');
  const action=$('glassAction');
  const backup=$('soundFallback');
  const clips=Object.freeze({
    BEFORE:$('crystalBefore'),
    FAIL:$('crystalFail'),
    CORRECTED_LOCAL:$('crystalCorrected')
  });
  if(!button||!label||!help||!glass||!action||!backup||
     Object.values(clips).some(x=>!x))return;

  const dictionary={
    ar:{
      off:'🔊 فعّل واسمع Crystal Whisper',
      on:'🔇 اكتم صوت الزجاجات',
      prompt:'اضغط لتسمع صوتنا الأصلي مباشرة، ثم اضغط الزجاج ثلاث مرات.',
      ready:'المشغّل جاهز. كل ضغطة على الزجاج تشغّل مرحلة مختلفة.',
      requested:'طلبنا من Safari تشغيل النغمة. إذا لم تسمعها، افتح مشغّل الآيفون الأصلي أدناه.',
      muted:'تم كتم صوت المعاينة.',
      loading:'جارٍ تشغيل الملف الصوتي المختار…',
      blocked:'Safari لم يبدأ تشغيل الصوت. افتح المشغّل الأصلي أدناه واضغط ▶.',
      issue:'فشل تحميل الملف الصوتي؛ المعاينة البصرية ستبقى تعمل.',
      fallbackTitle:'الصوت ما انسمع؟ جرّبه من مشغّل الآيفون الأصلي',
      fallbackText:'اضغط ▶ في المشغّل أدناه. هذه نفس نغمة Crystal Whisper، محفوظة كملف صوتي محلي للتوافق مع Safari.'
    },
    en:{
      off:'🔊 Enable & hear Crystal Whisper',
      on:'🔇 Mute glass sound',
      prompt:'Tap to hear the original selected sound right away, then step through the three glass stages.',
      ready:'Media player ready. Every glass tap plays the matching stage.',
      requested:'Safari started the clip. If you did not hear it, use the native audio player below.',
      muted:'Preview sound muted.',
      loading:'Starting your original sound…',
      blocked:'Safari declined playback. Open the native player below and press Play.',
      issue:'The sound file failed to load; the visual preview still works.',
      fallbackTitle:'No sound? Try the native iPhone audio player',
      fallbackText:'Press Play in the player below. This is the original Crystal Whisper composition, rendered as local media for Safari.'
    }
  };
  const t=()=>dictionary[document.documentElement.lang==='en'?'en':'ar'];
  let enabled=false;
  let lastReason='prompt';
  let generation=0;
  let current=null;

  function paint(){
    const copy=t();
    label.textContent=enabled?copy.on:copy.off;
    button.setAttribute('aria-pressed',String(enabled));
    button.title=label.textContent;
    backup.querySelector('summary').textContent=copy.fallbackTitle;
    backup.querySelector('p').textContent=copy.fallbackText;
    $('nativeSoundTest')?.setAttribute('aria-label',document.documentElement.lang==='en'?'Play Crystal Whisper using the native media player':'تجربة Crystal Whisper بمشغّل الوسائط الأصلي');
    help.textContent=copy[lastReason]||copy.prompt;
  }
  function stopAll(){
    for(const media of Object.values(clips)){
      try{media.pause();media.currentTime=0}catch{/* no media yet */}
    }
    current=null;
  }
  function playSelected(phase){
    if(!enabled||document.hidden)return;
    const audio=clips[phase]||clips.BEFORE;
    const index=++generation;
    stopAll();
    current=audio;
    lastReason='loading';
    paint();
    try{
      audio.volume=1;
      audio.muted=false;
      audio.currentTime=0;
      // Crucial: invoke HTMLMediaElement.play directly in the user's click,
      // not from an awaited Promise or page-load event.
      const promise=audio.play();
      if(promise&&typeof promise.then==='function'){
        promise.then(()=>{
          if(index!==generation||!enabled)return;
          lastReason='requested';
          paint(); // Not proof of acoustic output on a physical device.
        }).catch(()=>{
          if(index!==generation)return;
          lastReason='blocked';
          backup.open=true;
          paint();
        });
      }else{
        lastReason='requested';paint();
      }
    }catch{
      if(index!==generation)return;
      lastReason='blocked';backup.open=true;paint();
    }
  }
  button.addEventListener('click',()=>{
    ++generation;
    if(enabled){
      enabled=false;
      stopAll();
      lastReason='muted';
      paint();
      return;
    }
    enabled=true;
    lastReason='ready';
    paint();
    // User-initiated original sound sample — no silent "enabled" state.
    playSelected('BEFORE');
  });
  // Read the old stage before the visual-only step advances.
  action.addEventListener('click',()=>{
    if(enabled)playSelected(glass.dataset.phase);
  },true);
  window.addEventListener('naif:preview-language-changed',paint);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      ++generation;
      stopAll();
    }
  });
  for(const audio of Object.values(clips)){
    audio.addEventListener('error',()=>{
      if(!enabled||audio!==current)return;
      lastReason='issue';
      backup.open=true;
      paint();
    });
  }
  // No persistence and no audio on load. Requires an explicit tap each visit.
  paint();
})();
