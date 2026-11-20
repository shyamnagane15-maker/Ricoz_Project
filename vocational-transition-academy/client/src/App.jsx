export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-udaan-gold focus:px-4 focus:py-2 focus:text-udaan-navy"
      >
        Skip to main content
      </a>

      <header className="bg-udaan-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="text-xl font-bold tracking-tight focus-visible:outline-udaan-gold">
            Udaan <span className="font-normal text-udaan-gold">Academy</span>
          </a>
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-6 text-sm font-medium">
              <li><a href="#" className="hover:underline focus-visible:outline-udaan-gold">Home</a></li>
              <li><a href="#" className="hover:underline focus-visible:outline-udaan-gold">Programs</a></li>
              <li><a href="#" className="hover:underline focus-visible:outline-udaan-gold">About</a></li>
              <li><a href="#" className="hover:underline focus-visible:outline-udaan-gold">Login</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-udaan-navy">
            Udaan Vocational &amp; Empowerment Academy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-udaan-muted">
            Job-readiness training in data entry, packaging, animal care and retail operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="rounded-md bg-udaan-brand px-6 py-3 font-semibold text-white hover:bg-udaan-navy">
              Explore programs
            </a>
            <a href="#" className="rounded-md border-2 border-udaan-brand bg-white px-6 py-3 font-semibold text-udaan-brand hover:bg-udaan-cloud">
              Make an enquiry
            </a>
          </div>
        </section>
      </main>
    </>
  )
}