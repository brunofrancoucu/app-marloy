import Link from 'next/link'
import { getDictionary, Locale } from '@/lib/services/language/server'
import AuthNav from './AuthNav'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'

export default async function Navbar({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  return (
    <nav className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 p-4 backdrop-blur-md sm:p-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href={`/${lang}`}
          className="font-heading text-2xl font-black tracking-tight text-primary"
        >
          BrewBase.
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link
            href={`/${lang}/inventory`}
            className="hidden transition-colors hover:text-primary sm:block"
          >
            {dict.navbar.inventory}
          </Link>
          <Link
            href={`/${lang}/staff`}
            className="hidden transition-colors hover:text-primary sm:block"
          >
            {dict.navbar.staff}
          </Link>

          {/* Conditional Auth Rendering */}
          <AuthNav dict={dict.auth} />

          {/* Utility Toggles */}
          <div className="flex items-center gap-2 border-l border-foreground/20 pl-4">
            <LangToggle currentLang={lang} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
