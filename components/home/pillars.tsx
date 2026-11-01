const pillars = [
  {
    title: "Private by default",
    body: "No account. Notes, scans, pages and playlists stay in a library on the phone.",
  },
  {
    title: "Works offline",
    body: "Open a PDF, a note or a video without signing in. The work does not go to a SouMoster server.",
  },
  {
    title: "Built to last",
    body: "Each app keeps one privacy page at a URL that a Play listing can point at for good.",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="pillars-title">
      <h2 id="pillars-title" className="headline text-3xl sm:text-4xl">
        A quieter kind of studio
      </h2>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <li key={pillar.title} className="glass rounded-2xl p-6">
            <h3 className="font-heading text-xl font-semibold">{pillar.title}</h3>
            <p className="mt-2 text-sm text-muted">{pillar.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
