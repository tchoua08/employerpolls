import "@testing-library/jest-dom";

// Masquer les warnings React Router v6 future flags (optionnel)
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    const msg = String(args[0] || "");
    if (msg.includes("React Router Future Flag Warning")) return;
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});