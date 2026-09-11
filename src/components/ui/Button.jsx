export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "inline-flex items-center justify-center rounded-md bg-roseDark text-white shadow-[0_14px_30px_-14px_rgba(168,94,109,0.65)] transition duration-200 hover:-translate-y-0.5 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseDark focus-visible:ring-offset-2",
    secondary:
      "inline-flex items-center justify-center rounded-md border border-ink bg-transparent text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseDark focus-visible:ring-offset-2",
    ghost:
      "inline-flex items-center justify-center rounded-md bg-white text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseDark focus-visible:ring-offset-2",
  };

  return (
    <button
      {...props}
      className={`${styles[variant]} ${className}`.trim()}
      type={props.type || "button"}
    >
      {children}
    </button>
  );
}
