type THtmlElement = HTMLElement;

type TClassName = THtmlElement["className"];

export const Link = (p: {
  href: string;
  children: React.ReactNode;
  className?: TClassName;
}) => {
  return (
    <a
      className={`inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base ${p.className}`}
    >
      {p.children}
    </a>
  );
};
