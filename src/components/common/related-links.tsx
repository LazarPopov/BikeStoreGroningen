import Link from "next/link";

type RelatedLinkItem = {
  label: string;
  href: string;
};

type RelatedLinksProps = {
  title: string;
  items: RelatedLinkItem[];
};

export function RelatedLinks({ title, items }: RelatedLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold text-zinc-900">{title}</h2>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}