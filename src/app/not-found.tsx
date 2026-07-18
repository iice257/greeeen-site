import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link className="not-found-brand" href="/">GREEEEN</Link>
      <span className="not-found-note">Fictional brand concept / Adults 21+</span>
      <div className="not-found-copy">
        <p className="not-found-code" aria-hidden="true">404</p>
        <p className="not-found-kicker">Wrong turn / Right frequency</p>
        <h1>This path has gone to seed.</h1>
        <div className="not-found-actions">
          <Link className="magnetic-link is-acid" href="/">Return home <ArrowRight size={18} /></Link>
          <Link className="magnetic-link" href="/#flower">Explore flower <ArrowRight size={18} /></Link>
        </div>
      </div>
    </main>
  );
}
