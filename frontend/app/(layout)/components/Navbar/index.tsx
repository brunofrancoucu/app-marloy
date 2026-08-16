import Link from 'next/link'
import AuthNav from './AuthNav'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 p-4 backdrop-blur-md sm:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl font-black tracking-tight text-primary"
        >
          BrewBase.
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link
            href="/inventory"
            className="hidden transition-colors hover:text-primary sm:block"
          >
            Inventory
          </Link>
          <Link
            href="/staff"
            className="hidden transition-colors hover:text-primary sm:block"
          >
            Staff
          </Link>

          {/* Conditional Auth Rendering */}
          <AuthNav />
        </div>
      </div>
    </nav>
  )
}
