// Slow drifting color glows + a faint dot grid. Pure CSS, so it costs almost nothing.
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="blob a" />
      <span className="blob b" />
      <span className="blob c" />
    </div>
  );
}
