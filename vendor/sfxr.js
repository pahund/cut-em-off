/**
 * SfxrParams
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
function SfxrParams() {
  //--------------------------------------------------------------------------
  //
  //  Settings String Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Parses a settings array into the parameters
   * @param array Array of the settings values, where elements 0 - 23 are
   *                a: waveType
   *                b: attackTime
   *                c: sustainTime
   *                d: sustainPunch
   *                e: decayTime
   *                f: startFrequency
   *                g: minFrequency
   *                h: slide
   *                i: deltaSlide
   *                j: vibratoDepth
   *                k: vibratoSpeed
   *                l: changeAmount
   *                m: changeSpeed
   *                n: squareDuty
   *                o: dutySweep
   *                p: repeatSpeed
   *                q: phaserOffset
   *                r: phaserSweep
   *                s: lpFilterCutoff
   *                t: lpFilterCutoffSweep
   *                u: lpFilterResonance
   *                v: hpFilterCutoff
   *                w: hpFilterCutoffSweep
   *                x: masterVolume
   * @return If the string successfully parsed
   */
  this.setSettings = function(values) {
    for (let i = 0; i < 24; i++) {
      this[String.fromCharCode(97 + i)] = values[i] || 0;
    }

    // I moved this here from the reset(true) function
    if (this.c < 0.01) {
      this.c = 0.01;
    }

    const totalTime = this.c + this.e;
    if (totalTime < 0.18) {
      const multiplier = 0.18 / totalTime;
      this.c *= multiplier;
      this.e *= multiplier;
    }
  };
}

/**
 * SfxrSynth
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
function SfxrSynth() {
  // All variables are kept alive through function closures

  //--------------------------------------------------------------------------
  //
  //  Sound Parameters
  //
  //--------------------------------------------------------------------------

  this._params = new SfxrParams(); // Params instance

  //--------------------------------------------------------------------------
  //
  //  Synth Variables
  //
  //--------------------------------------------------------------------------

  let _envelopeLength0, // Length of the attack stage
      _envelopeLength1, // Length of the sustain stage
      _envelopeLength2, // Length of the decay stage
      _period, // Period of the wave
      _maxPeriod, // Maximum period before sound stops (from minFrequency)
      _slide, // Note slide
      _deltaSlide, // Change in slide
      _changeAmount, // Amount to change the note by
      _changeTime, // Counter for the note change
      _changeLimit, // Once the time reaches this limit, the note changes
      _squareDuty, // Offset of center switching point in the square wave
      _dutySweep; // Amount to change the duty by

  //--------------------------------------------------------------------------
  //
  //  Synth Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Resets the runing variables from the params
   * Used once at the start (total reset) and for the repeat effect (partial reset)
   */
  this.reset = function() {
    // Shorter reference
    const p = this._params;

    _period = 100 / (p.f * p.f + 0.001);
    _maxPeriod = 100 / (p.g * p.g + 0.001);

    _slide = 1 - p.h * p.h * p.h * 0.01;
    _deltaSlide = -p.i * p.i * p.i * 0.000001;

    if (!p.a) {
      _squareDuty = 0.5 - p.n / 2;
      _dutySweep = -p.o * 0.00005;
    }

    _changeAmount = p.l > 0 ? 1 - p.l * p.l * 0.9 : 1 + p.l * p.l * 10;
    _changeTime = 0;
    _changeLimit = p.m == 1 ? 0 : (1 - p.m) * (1 - p.m) * 20000 + 32;
  };

  // I split the reset() function into two functions for better readability
  this.totalReset = function() {
    this.reset();

    // Shorter reference
    const p = this._params;

    // Calculating the length is all that remained here, everything else moved somewhere
    _envelopeLength0 = 0;
    _envelopeLength1 = p.c * p.c * 100000;
    _envelopeLength2 = p.e * p.e * 100000 + 10;
    // Full length of the volume envelop (and therefore sound)
    return (_envelopeLength0 + _envelopeLength1 + _envelopeLength2) | 0;
  };

  /**
   * Writes the wave to the supplied buffer ByteArray
   * @param buffer A ByteArray to write the wave to
   * @return If the wave is finished
   */
  this.synthWave = function(buffer, length) {
    // Shorter reference
    const p = this._params;

    // If the filters are active
    const _filters = p.s != 1 || p.v;

    // Cutoff multiplier which adjusts the amount the wave position can move

    let _hpFilterCutoff = p.v * p.v * 0.1;

    // Speed of the high-pass cutoff multiplier

    const _hpFilterDeltaCutoff = 0.0003;

    // Cutoff multiplier which adjusts the amount the wave position can move

    let _lpFilterCutoff = p.s * p.s * p.s * 0.1;

    // Speed of the low-pass cutoff multiplier

    const _lpFilterDeltaCutoff = 0.0001;

    // If the low pass filter is active

    const _lpFilterOn = p.s != 1;

    // masterVolume * masterVolume (for quick calculations)

    const _masterVolume = p.x * p.x;

    // Minimum frequency before stopping

    const _minFreqency = p.g;

    // If the phaser is active

    const _phaser = p.q || p.r;

    // Change in phase offset

    const _phaserDeltaOffset = p.r * p.r * p.r * 0.2;

    // Phase offset for phaser effect

    let _phaserOffset = p.q * p.q * (p.q < 0 ? -1020 : 1020);

    // Once the time reaches this limit, some of the    iables are reset

    // The punch factor (louder at begining of sustain)

    const _sustainPunch = p.d;

    // The type of wave to generate

    const _waveType = p.a;

    let _envelopeLength = _envelopeLength0;
    // Length of the current envelope stage

    const _envelopeOverLength0 = 1 / _envelopeLength0;
    // (for quick calculations)

    const _envelopeOverLength1 = 1 / _envelopeLength1;
    // (for quick calculations)

    const _envelopeOverLength2 = 1 / _envelopeLength2; // (for quick calculations)

    // Damping muliplier which restricts how fast the wave position can move
    let _lpFilterDamping = 5 * (0.01 + _lpFilterCutoff);
    if (_lpFilterDamping > 0.8) {
      _lpFilterDamping = 0.8;
    }
    _lpFilterDamping = 1 - _lpFilterDamping;

    let _finished = false;
    // If the sound has finished

    let _envelopeStage = 0;
    // Current stage of the envelope (attack, sustain, decay, end)

    let _envelopeTime = 0;
    // Current time through current enelope stage

    let _envelopeVolume = 0;
    // Current volume of the envelope

    let _hpFilterPos = 0;
    // Adjusted wave position after high-pass filter

    let _lpFilterDeltaPos = 0;
    // Change in low-pass wave position, as allowed by the cutoff and damping

    let _lpFilterOldPos,


        // Previous low-pass wave position


        _lpFilterPos = 0;



    // Adjusted wave position after low-pass filter



    let _periodTemp,


        // Period modified by vibrato

        _phase = 0;


    // Phase through the wave


    let _phaserInt;

    // Integer phaser offset, for bit maths

    let _phaserPos = 0;

    // Position through the phaser buffer

    let _pos,



        // Phase expresed as a Number from 0-1, used for fast sin approx




        _repeatTime = 0;




    // Counter for the repeats





    var _sample;




    // Sub-sample calculated 8 times per actual sample, averaged out to get the super sample





    var _superSample;
    // Actual sample writen to the wave

    let _vibratoPhase = 0; // Phase through the vibrato sine wave

    // Buffer of wave values used to create the out of phase second wave
    const _phaserBuffer = new Array(1024);

    // Buffer of random values used to generate noise

    const _noiseBuffer = new Array(32);
    for (var i = _phaserBuffer.length; i--; ) {
      _phaserBuffer[i] = 0;
    }
    for (var i = _noiseBuffer.length; i--; ) {
      _noiseBuffer[i] = Math.random() * 2 - 1;
    }

    for (var i = 0; i < length; i++) {
      if (_finished) {
        return i;
      }

      // If _changeLimit is reached, shifts the pitch
      if (_changeLimit) {
        if (++_changeTime >= _changeLimit) {
          _changeLimit = 0;
          _period *= _changeAmount;
        }
      }

      // Acccelerate and apply slide
      _slide += _deltaSlide;
      _period *= _slide;

      // Checks for frequency getting too low, and stops the sound if a minFrequency was set
      if (_period > _maxPeriod) {
        _period = _maxPeriod;
        if (_minFreqency > 0) {
          _finished = true;
        }
      }

      _periodTemp = _period;

      _periodTemp |= 0;
      if (_periodTemp < 8) {
        _periodTemp = 8;
      }

      // Sweeps the square duty
      if (!_waveType) {
        _squareDuty += _dutySweep;
        if (_squareDuty < 0) {
          _squareDuty = 0;
        } else if (_squareDuty > 0.5) {
          _squareDuty = 0.5;
        }
      }

      // Moves through the different stages of the volume envelope
      if (++_envelopeTime > _envelopeLength) {
        _envelopeTime = 0;

        switch (++_envelopeStage) {
          case 1:
            _envelopeLength = _envelopeLength1;
            break;
          case 2:
            _envelopeLength = _envelopeLength2;
        }
      }

      // Sets the volume based on the position in the envelope
      switch (_envelopeStage) {
        case 0:
          _envelopeVolume = _envelopeTime * _envelopeOverLength0;
          break;
        case 1:
          _envelopeVolume = 1 + (1 - _envelopeTime * _envelopeOverLength1) * 2 * _sustainPunch;
          break;
        case 2:
          _envelopeVolume = 1 - _envelopeTime * _envelopeOverLength2;
          break;
        case 3:
          _envelopeVolume = 0;
          _finished = true;
      }

      // Moves the phaser offset
      if (_phaser) {
        _phaserOffset += _phaserDeltaOffset;
        _phaserInt = _phaserOffset | 0;
        if (_phaserInt < 0) {
          _phaserInt = -_phaserInt;
        } else if (_phaserInt > 1023) {
          _phaserInt = 1023;
        }
      }

      // Moves the high-pass filter cutoff
      if (_filters && _hpFilterDeltaCutoff) {
        _hpFilterCutoff *= _hpFilterDeltaCutoff;
        if (_hpFilterCutoff < 0.00001) {
          _hpFilterCutoff = 0.00001;
        } else if (_hpFilterCutoff > 0.1) {
          _hpFilterCutoff = 0.1;
        }
      }

      _superSample = 0;
      for (let j = 8; j--; ) {
        // Cycles through the period
        _phase++;
        if (_phase >= _periodTemp) {
          _phase %= _periodTemp;

          // Generates new random noise for this period
          if (_waveType == 3) {
            for (let n = _noiseBuffer.length; n--; ) {
              _noiseBuffer[n] = Math.random() * 2 - 1;
            }
          }
        }

        // Gets the sample from the oscillator
        switch (_waveType) {
          case 0: // Square wave
            _sample = _phase / _periodTemp < _squareDuty ? 0.5 : -0.5;
            break;
          case 1: // Saw wave
            _sample = 1 - (_phase / _periodTemp) * 2;
            break;
          case 2: // Sine wave (fast and accurate approx)
            _pos = _phase / _periodTemp;
            _pos = _pos > 0.5 ? (_pos - 1) * 6.28318531 : _pos * 6.28318531;
            _sample =
                _pos < 0
                    ? 1.27323954 * _pos + 0.405284735 * _pos * _pos
                    : 1.27323954 * _pos - 0.405284735 * _pos * _pos;
            _sample =
                _sample < 0
                    ? 0.225 * (_sample * -_sample - _sample) + _sample
                    : 0.225 * (_sample * _sample - _sample) + _sample;
            break;
          case 3: // Noise
            _sample = _noiseBuffer[Math.abs(((_phase * 32) / _periodTemp) | 0)];
        }

        // Applies the low and high pass filters
        if (_filters) {
          _lpFilterOldPos = _lpFilterPos;
          _lpFilterCutoff *= _lpFilterDeltaCutoff;
          if (_lpFilterCutoff < 0) {
            _lpFilterCutoff = 0;
          } else if (_lpFilterCutoff > 0.1) {
            _lpFilterCutoff = 0.1;
          }

          if (_lpFilterOn) {
            _lpFilterDeltaPos += (_sample - _lpFilterPos) * _lpFilterCutoff;
            _lpFilterDeltaPos *= _lpFilterDamping;
          } else {
            _lpFilterPos = _sample;
            _lpFilterDeltaPos = 0;
          }

          _lpFilterPos += _lpFilterDeltaPos;

          _hpFilterPos += _lpFilterPos - _lpFilterOldPos;
          _hpFilterPos *= 1 - _hpFilterCutoff;
          _sample = _hpFilterPos;
        }

        // Applies the phaser effect
        if (_phaser) {
          _phaserBuffer[_phaserPos % 1024] = _sample;
          _sample += _phaserBuffer[(_phaserPos - _phaserInt + 1024) % 1024];
          _phaserPos++;
        }

        _superSample += _sample;
      }

      // Averages out the super samples and applies volumes
      _superSample *= 0.125 * _envelopeVolume * _masterVolume;

      // Clipping if too loud
      buffer[i] = _superSample >= 1 ? 32767 : _superSample <= -1 ? -32768 : (_superSample * 32767) | 0;
    }

    return length;
  };
}

// Adapted from http://codebase.es/riffwave/
const synth = new SfxrSynth();
// Export for the Closure Compiler
export default function(settings) {
  // Initialize SfxrParams
  synth._params.setSettings(settings);
  // Synthesize Wave
  const envelopeFullLength = synth.totalReset();
  const data = new Uint8Array((((envelopeFullLength + 1) / 2) | 0) * 4 + 44);
  let used = synth.synthWave(new Uint16Array(data.buffer, 44), envelopeFullLength) * 2;
  const dv = new Uint32Array(data.buffer, 0, 44);
  // Initialize header
  dv[0] = 0x46464952; // "RIFF"
  dv[1] = used + 36; // put total size here
  dv[2] = 0x45564157; // "WAVE"
  dv[3] = 0x20746d66; // "fmt "
  dv[4] = 0x00000010; // size of the following
  dv[5] = 0x00010001; // Mono: 1 channel, PCM format
  dv[6] = 0x0000ac44; // 44,100 samples per second
  dv[7] = 0x00015888; // byte rate: two bytes per sample
  dv[8] = 0x00100002; // 16 bits per sample, aligned on every two bytes
  dv[9] = 0x61746164; // "data"
  dv[10] = used; // put number of samples here

  // Base64 encoding written by me, @maettig
  used += 44;
  let i = 0;

  let output = 'data:audio/wav;base64,';
  for (; i < used; i += 3) {
    const a = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
    output +=
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[a >> 18] +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[(a >> 12) & 63] +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[(a >> 6) & 63] +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[a & 63];
  }
  i -= used;
  return output.slice(0, output.length - i) + '=='.slice(0, i);
}
