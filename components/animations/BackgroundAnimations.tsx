/**
 * BackgroundAnimations
 *
 * Mounts all decorative background animation layers behind all page content.
 * • Fixed-positioned, pointer-events disabled, z-index 0
 * • Each child handles its own animation logic client-side
 * • Wrapped in aria-hidden so screen readers ignore purely decorative content
 */

import MovingLines from "./MovingLines";
import GlitchEffect from "./GlitchEffect";
import WaveDots from "./WaveDots";

export default function BackgroundAnimations() {
  return (
    <>
      <MovingLines />
      <WaveDots />
      <GlitchEffect />
    </>
  );
}
