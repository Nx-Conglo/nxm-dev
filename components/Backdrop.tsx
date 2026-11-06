import PixelField from "./PixelField";

// Page background: pixel-grid noise, a slow scan line and tiny HUD readouts.
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <PixelField />
      <span className="scan" />
      <span className="hud-cross tl">+</span>
      <span className="hud-cross tr">+</span>
      <span className="hud-cross bl">+</span>
      <span className="hud-cross br">+</span>
      <span className="hud-tag bl">SYS.ONLINE</span>
      <span className="hud-tag br">NXM//DEV</span>
    </div>
  );
}
