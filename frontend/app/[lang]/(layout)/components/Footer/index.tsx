import { getDictionary, Locale } from '@/lib/services/language/server'

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  return (
    <footer className="border-t border-foreground/10 py-8 text-center text-sm opacity-60">
      <p>{dict.footer.rights}</p>
    </footer>
  )
}
