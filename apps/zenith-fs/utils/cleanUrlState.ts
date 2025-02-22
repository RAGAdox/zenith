export default function cleanUrlState() {
  if (typeof window === "undefined") {
    throw new Error("This function should execute on client side");
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}
