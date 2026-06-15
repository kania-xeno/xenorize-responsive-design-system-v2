import Button from "./components/button/Button.jsx";

export default function App() {
  return (
    <div style={{ padding: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button type="primary" variant="filled">
        Primary filled
      </Button>
      <Button type="error" variant="stroke">
        Error stroke
      </Button>
      <Button type="neutral" variant="lighter">
        Neutral lighter
      </Button>
      <Button type="primary" variant="ghost">
        Primary ghost
      </Button>
      <Button type="primary" variant="filled" disabled>
        Disabled
      </Button>
    </div>
  );
}
