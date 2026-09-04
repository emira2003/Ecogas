/** First focusable element on every page. Hidden until it receives keyboard focus. */
export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to main content
    </a>
  );
}
