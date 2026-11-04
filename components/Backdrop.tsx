import SandField from "./SandField";

// Page background: a soft glow with a field of drifting sand grains on top.
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <SandField />
    </div>
  );
}
