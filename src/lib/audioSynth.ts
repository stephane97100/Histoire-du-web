/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let globalAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  return globalAudioCtx;
}

/**
 * 1. Windows 95 Startup Chime Synthesizer
 * Synthesizes a beautiful swelling brass/synth chord followed by pure chime bells.
 */
export function playWin95Startup() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  // Master Gain to prevent clipping
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.35, now + 1.2); // swell in
  masterGain.gain.setValueAtTime(0.35, now + 3.0);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0); // slow decay
  masterGain.connect(ctx.destination);

  // Reverb/Delay simulation
  const delay = ctx.createDelay();
  delay.delayTime.setValueAtTime(0.18, now);
  const delayFeedback = ctx.createGain();
  delayFeedback.gain.setValueAtTime(0.4, now);
  const delayGain = ctx.createGain();
  delayGain.gain.setValueAtTime(0.25, now);

  masterGain.connect(delay);
  delay.connect(delayFeedback);
  delayFeedback.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(ctx.destination);

  // Chime notes: Eb4, Ab4, Bb4, Eb5, G5, Bb5, Eb6
  const chimeNotes = [311.13, 415.30, 466.16, 622.25, 783.99, 932.33, 1244.50];
  const delaySpacing = 0.08;

  chimeNotes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * delaySpacing);

    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.setValueAtTime(0, now + idx * delaySpacing);
    oscGain.gain.linearRampToValueAtTime(0.08, now + idx * delaySpacing + 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * delaySpacing + 1.8);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now + idx * delaySpacing);
    osc.stop(now + idx * delaySpacing + 2.0);
  });

  // Deep pad chord: Eb3, Ab3, C4, G4
  const padNotes = [155.56, 207.65, 261.63, 392.00];
  padNotes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.detune.setValueAtTime(idx * 7 - 10, now);

    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.06, now + 1.5);
    oscGain.gain.setValueAtTime(0.06, now + 3.0);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 6.0);
  });
}

/**
 * 2. 56k Modem Dial-up Handshake Synthesizer
 * Simulates US dialtone, DTMF dialing (spelling high-tech), ringing, and filtered hiss/screeches.
 */
export function playModemDialup() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.12, now); // modem is loud, keep cozy
  masterGain.connect(ctx.destination);

  // Dialtone (350 Hz + 440 Hz)
  const oscDial1 = ctx.createOscillator();
  const oscDial2 = ctx.createOscillator();
  const dialGain = ctx.createGain();

  oscDial1.type = 'sine';
  oscDial1.frequency.setValueAtTime(350, now);
  oscDial2.type = 'sine';
  oscDial2.frequency.setValueAtTime(440, now);

  dialGain.gain.setValueAtTime(0.5, now);
  dialGain.gain.setValueAtTime(0.5, now + 1.2);
  dialGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

  oscDial1.connect(dialGain);
  oscDial2.connect(dialGain);
  dialGain.connect(masterGain);

  oscDial1.start(now);
  oscDial1.stop(now + 1.3);
  oscDial2.start(now);
  oscDial2.stop(now + 1.3);

  // DTMF dialing sequence for "1989" (Web Invent)
  const dtmfList = [
    { low: 697, high: 1209, duration: 0.12 },
    { low: 852, high: 1477, duration: 0.12 },
    { low: 852, high: 1336, duration: 0.12 },
    { low: 852, high: 1477, duration: 0.12 },
  ];

  let startDigitTime = now + 1.4;
  dtmfList.forEach((digit) => {
    const oLow = ctx.createOscillator();
    const oHigh = ctx.createOscillator();
    const digitGain = ctx.createGain();

    oLow.type = 'sine';
    oLow.frequency.setValueAtTime(digit.low, startDigitTime);
    oHigh.type = 'sine';
    oHigh.frequency.setValueAtTime(digit.high, startDigitTime);

    digitGain.gain.setValueAtTime(0, now);
    digitGain.gain.setValueAtTime(0, startDigitTime);
    digitGain.gain.linearRampToValueAtTime(0.4, startDigitTime + 0.01);
    digitGain.gain.setValueAtTime(0.4, startDigitTime + digit.duration - 0.01);
    digitGain.gain.exponentialRampToValueAtTime(0.0001, startDigitTime + digit.duration);

    oLow.connect(digitGain);
    oHigh.connect(digitGain);
    digitGain.connect(masterGain);

    oLow.start(startDigitTime);
    oLow.stop(startDigitTime + digit.duration + 0.05);
    oHigh.start(startDigitTime);
    oHigh.stop(startDigitTime + digit.duration + 0.05);

    startDigitTime += digit.duration + 0.08;
  });

  // Remote Ring Tone
  const ringStartTime = startDigitTime + 0.2;
  const ringDuration = 1.3;

  const oRing1 = ctx.createOscillator();
  const oRing2 = ctx.createOscillator();
  const ringGain = ctx.createGain();

  oRing1.type = 'sine';
  oRing1.frequency.setValueAtTime(440, ringStartTime);
  oRing2.type = 'sine';
  oRing2.frequency.setValueAtTime(480, ringStartTime);

  ringGain.gain.setValueAtTime(0, now);
  ringGain.gain.setValueAtTime(0, ringStartTime);
  ringGain.gain.linearRampToValueAtTime(0.35, ringStartTime + 0.15);
  ringGain.gain.setValueAtTime(0.35, ringStartTime + ringDuration - 0.15);
  ringGain.gain.exponentialRampToValueAtTime(0.0001, ringStartTime + ringDuration);

  oRing1.connect(ringGain);
  oRing2.connect(ringGain);
  ringGain.connect(masterGain);

  oRing1.start(ringStartTime);
  oRing1.stop(ringStartTime + ringDuration + 0.1);
  oRing2.start(ringStartTime);
  oRing2.stop(ringStartTime + ringDuration + 0.1);

  // Handshake Screech
  const handshakeStartTime = ringStartTime + ringDuration + 0.3;
  const handshakeLength = 3.8;

  // Noise Buffer
  const bufferSize = ctx.sampleRate * handshakeLength;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoiseSource = ctx.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.setValueAtTime(1000, handshakeStartTime);
  noiseFilter.Q.setValueAtTime(5, handshakeStartTime);
  noiseFilter.frequency.linearRampToValueAtTime(350, handshakeStartTime + 0.8);
  noiseFilter.frequency.linearRampToValueAtTime(2200, handshakeStartTime + 1.8);
  noiseFilter.frequency.linearRampToValueAtTime(600, handshakeStartTime + 2.8);
  noiseFilter.frequency.linearRampToValueAtTime(1500, handshakeStartTime + handshakeLength);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.setValueAtTime(0, handshakeStartTime);
  noiseGain.gain.linearRampToValueAtTime(0.3, handshakeStartTime + 0.05);
  noiseGain.gain.setValueAtTime(0.3, handshakeStartTime + 2.0);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, handshakeStartTime + handshakeLength);

  whiteNoiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);

  whiteNoiseSource.start(handshakeStartTime);
  whiteNoiseSource.stop(handshakeStartTime + handshakeLength);

  // carrier tone modulation
  const oScreech = ctx.createOscillator();
  const screechGain = ctx.createGain();

  oScreech.type = 'triangle';
  oScreech.frequency.setValueAtTime(1200, handshakeStartTime + 0.5);
  oScreech.frequency.exponentialRampToValueAtTime(2400, handshakeStartTime + 0.9);
  oScreech.frequency.linearRampToValueAtTime(1500, handshakeStartTime + 1.5);
  oScreech.frequency.exponentialRampToValueAtTime(3200, handshakeStartTime + 2.2);
  oScreech.frequency.linearRampToValueAtTime(900, handshakeStartTime + 3.0);

  screechGain.gain.setValueAtTime(0, now);
  screechGain.gain.setValueAtTime(0, handshakeStartTime + 0.5);
  screechGain.gain.linearRampToValueAtTime(0.08, handshakeStartTime + 0.6);
  screechGain.gain.setValueAtTime(0.08, handshakeStartTime + 2.5);
  screechGain.gain.exponentialRampToValueAtTime(0.0001, handshakeStartTime + handshakeLength);

  oScreech.connect(screechGain);
  screechGain.connect(masterGain);

  oScreech.start(handshakeStartTime + 0.5);
  oScreech.stop(handshakeStartTime + handshakeLength);
}

/**
 * 3. Internet Explorer Popup Blocked "Ding" Chime
 * Synthesizes the exact crystalline, high-mid pitch computer system "ding" of IE 6.
 */
export function playIeDing() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.18, now + 0.015);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
  masterGain.connect(ctx.destination);

  // Core metallic gong tone
  const carrier = ctx.createOscillator();
  carrier.type = 'triangle';
  carrier.frequency.setValueAtTime(880, now); // A5

  // Saturated high metal overtones
  const overtone = ctx.createOscillator();
  overtone.type = 'sine';
  overtone.frequency.setValueAtTime(1318.51, now); // E6

  const highTing = ctx.createOscillator();
  highTing.type = 'sine';
  highTing.frequency.setValueAtTime(2093.00, now); // C7

  carrier.connect(masterGain);
  overtone.connect(masterGain);
  highTing.connect(masterGain);

  carrier.start(now);
  carrier.stop(now + 1.0);
  overtone.start(now);
  overtone.stop(now + 1.0);
  highTing.start(now);
  highTing.stop(now + 1.0);
}

/**
 * 4. AOL Instant Messenger (AIM) / Mail 3-Tone Chime
 * Classic sliding synthetic G4-B4-D5 chime.
 */
export function playAolWelcome() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.12, now);
  masterGain.connect(ctx.destination);

  // 3 sequential notes
  const notes = [392.00, 493.88, 587.33]; // G4, B4, D5
  const duration = 0.15;
  const gap = 0.22;

  notes.forEach((freq, idx) => {
    const noteTime = now + idx * gap;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);

    // subtle glide
    if (idx > 0) {
      osc.frequency.setValueAtTime(notes[idx - 1], noteTime - 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq, noteTime + 0.02);
    }

    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.setValueAtTime(0, noteTime);
    oscGain.gain.linearRampToValueAtTime(0.15, noteTime + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration + 0.05);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(noteTime);
    osc.stop(noteTime + duration + 0.1);
  });
}

/**
 * 5. Mechanical 3.5" Floppy Disk Drive Sound (Read/Write)
 * Simulates the rhythmic stepper-motor scraping sound of early 1.44MB physical microfloppies.
 */
export function playFloppyDrive() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
  masterGain.gain.setValueAtTime(0.08, now + 2.0);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
  masterGain.connect(ctx.destination);

  // Low mechanical motor hum (stepper engine)
  const motor = ctx.createOscillator();
  motor.type = 'sawtooth';
  motor.frequency.setValueAtTime(95, now);

  // Filter out harsh highs to sound like plastic chassis enclosing a drive
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(320, now);

  // Rhythmic head seeking / grinding scrapes (step sequences)
  const steps = [0.1, 0.3, 0.45, 0.6, 0.9, 1.1, 1.25, 1.4, 1.6, 1.75];
  steps.forEach((stepOffset) => {
    const stepTime = now + stepOffset;
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();

    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(140, stepTime);
    clickOsc.frequency.linearRampToValueAtTime(65, stepTime + 0.08);

    clickGain.gain.setValueAtTime(0, now);
    clickGain.gain.setValueAtTime(0, stepTime);
    clickGain.gain.linearRampToValueAtTime(0.25, stepTime + 0.01);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, stepTime + 0.09);

    clickOsc.connect(lowpass);
    clickOsc.connect(clickGain);
    clickGain.connect(masterGain);

    clickOsc.start(stepTime);
    clickOsc.stop(stepTime + 0.15);
  });

  motor.connect(lowpass);
  lowpass.connect(masterGain);

  motor.start(now);
  motor.stop(now + 2.2);
}

