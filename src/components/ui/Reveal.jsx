import { useReveal } from "../../hooks/useReveal";

export default function Reveal({
  children,
  className = "",
  as: Component = "div",
}) {
  const { ref, visible } = useReveal();

  return (
    <Component
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(.25,.8,.25,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`.trim()}
    >
      {children}
    </Component>
  );
}
