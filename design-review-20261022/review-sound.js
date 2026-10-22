'use strict';
/*
 * NAIF Gravity Crystal Whisper — original V14 owner-selected sound identity.
 * Exact original tones: 1680/2510/3560 Hz, original envelopes, gain and
 * per-stage variants. Adapted ONLY to the public visual preview DOM.
 * Audio opt-in only, never autoplay or external audio/network.
 */
(() => {
  const toggle=document.getElementById('glassSoundToggle');
  const label=document.getElementById('glassSoundLabel');
  const help=document.getElementById('glassSoundHelp');
  const action=document.getElementById('glassAction');
  const scene=document.getElementById('glassChamber');
  const remote=document.querySelector('.glass-truth');
  if(!toggle||!label||!help||!action||!scene||!remote)return;

  const STORAGE_KEY='naif_v14_design_review_crystal_sound_optin_v1';
  const memo={
    ar:{on:'اكتم الصوت',off:'فعّل الصوت',
      prompt:'صوت Crystal Whisper الأصلي اختياري. فعّله ثم اضغط على الزجاج ثلاث مرات.',
      ready:'صوت Crystal Whisper مفعّل. اضغط على زر الزجاج لتسمع كل مرحلة.',
      muted:'الصوت مكتوم؛ ستستمر حركة الزجاج بصمت.',
      fail:'تعذر تشغيل الصوت في هذا المتصفح؛ سيبقى العرض صامتًا.'},
    en:{on:'Mute sound',off:'Enable sound',
      prompt:'The original Crystal Whisper sound is optional. Enable it, then tap the glass action three times.',
      ready:'Crystal Whisper is on. Tap the glass action to hear each stage.',
      muted:'Sound is muted. The visual glass animation still works.',
      fail:'Audio unavailable in this browser; the visual preview remains silent.'}
  };
  const copy=()=>memo[document.documentElement.lang==='en'?'en':'ar'];
  const read=()=>{try{return window.localStorage.getItem(STORAGE_KEY)}catch{return null}};
  const save=value=>{try{window.localStorage.setItem(STORAGE_KEY,value)}catch{/* Private browsing may block storage. */}};
  let enabled=read()==='on';
  let audioBlocked=false;
  let context=null;
  let master=null;
  let playToken=0;
  const liveOscillators=new Set();
  const phases=Object.freeze({
    BEFORE:Object.freeze({next:'FAIL',pitch:1,volume:1}),
    FAIL:Object.freeze({next:'CORRECTED_LOCAL',pitch:.94,volume:.78}),
    CORRECTED_LOCAL:Object.freeze({next:'BEFORE',pitch:1.06,volume:.60})
  });

  function paint(reason=''){
    const c=copy();
    const text=enabled?c.on:c.off;
    label.textContent=text;
    toggle.setAttribute('aria-pressed',String(enabled));
    toggle.title=text+' · Crystal Whisper';
    help.textContent=audioBlocked?c.fail:reason==='muted'?c.muted:enabled?c.ready:c.prompt;
  }
  function stopAll(){
    for(const osc of liveOscillators){try{osc.stop()}catch{/* Oscillator already ended. */}}
    liveOscillators.clear();
  }
  function ensureContext(){
    if(context)return context;
    const Ctor=window.AudioContext||window.webkitAudioContext;
    if(typeof Ctor!=='function')throw new Error('NO_WEB_AUDIO');
    context=new Ctor({latencyHint:'interactive'});
    master=context.createGain();
    // Identical gain to original V14 Crystal Whisper.
    master.gain.value=0.50;
    master.connect(context.destination);
    return context;
  }
  function note(freq,amp,duration,delay,attack){
    const t=context.currentTime+0.012+delay;
    const osc=context.createOscillator();
    const volume=context.createGain();
    osc.type='sine';
    osc.frequency.setValueAtTime(freq,t);
    volume.gain.setValueAtTime(0.00001,t);
    volume.gain.exponentialRampToValueAtTime(amp,t+attack);
    volume.gain.exponentialRampToValueAtTime(0.00001,t+duration);
    osc.connect(volume);
    volume.connect(master);
    liveOscillators.add(osc);
    osc.onended=()=>{
      liveOscillators.delete(osc);
      try{osc.disconnect();volume.disconnect()}catch{/* Already disconnected. */}
    };
    osc.start(t);
    osc.stop(t+duration+0.003);
  }
  function crystal(previousPhase){
    if(!enabled||!context||context.state!=='running'||document.hidden)return;
    const variant=phases[previousPhase];
    if(!variant)return;
    stopAll();
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(0.50,context.currentTime);
    // These three original frequencies, amp/duration/delay/attack values
    // were selected for V14. No extra sound family and no confirmation beep.
    note(1680*variant.pitch,0.065*variant.volume,0.071,0,0.002);
    note(2510*variant.pitch,0.028*variant.volume,0.083,0.003,0.003);
    note(3560*variant.pitch,0.010*variant.volume,0.068,0.007,0.003);
  }
  function unavailable(){
    enabled=false;
    audioBlocked=true;
    save('off');
    stopAll();
    paint();
  }
  function playForTransition(previousPhase){
    const variant=phases[previousPhase];
    if(!enabled||!variant||document.hidden||!remote.textContent.includes('REMOTE_UNKNOWN'))return;
    const token=++playToken;
    try{
      const c=ensureContext();
      if(c.state==='running'){crystal(previousPhase);return}
      c.resume().then(()=>{
        if(enabled&&token===playToken&&
           (scene.dataset.phase===previousPhase||scene.dataset.phase===variant.next))
          crystal(previousPhase);
      }).catch(()=>{/* The visual demo still runs in silent mode. */});
    }catch{/* Unsupported audio never affects visual steps. */}
  }
  toggle.addEventListener('click',()=>{
    const token=++playToken;
    if(enabled){
      enabled=false;
      save('off');
      stopAll();
      if(context&&context.state==='running')context.suspend().catch(()=>{});
      paint('muted');
      return;
    }
    audioBlocked=false;
    try{
      const c=ensureContext();
      const resumed=c.state==='running'?Promise.resolve():c.resume();
      Promise.resolve(resumed).then(()=>{
        if(token!==playToken)return;
        if(c.state!=='running')throw new Error('AUDIO_BLOCKED');
        enabled=true;
        save('on');
        paint();
      }).catch(()=>{
        if(token===playToken)unavailable();
      });
    }catch{
      unavailable();
    }
  });
  // Capture the BEFORE phase, then let the existing visual handler
  // advance the public illustration. Exactly one chime per glass step.
  action.addEventListener('click',()=>playForTransition(scene.dataset.phase),true);
  window.addEventListener('naif:preview-language-changed',()=>paint());
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      stopAll();
      if(context&&context.state==='running')context.suspend().catch(()=>{});
    }
  });
  paint(); // Never autoplay on load.
})();
