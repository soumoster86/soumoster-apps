import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 pt-36 pb-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="headline mt-3 text-4xl">That page is not in a pocket</h1>
      <p className="mt-4 text-muted">The link may be old. The apps are still on the home page.</p>
      <Link href="/" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
        Back home
      </Link>
    </section>
  );
}
