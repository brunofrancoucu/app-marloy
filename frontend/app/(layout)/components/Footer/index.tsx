export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-8 text-center text-sm opacity-60">
      <p>
        &copy; {new Date().getFullYear()} BrewBase Systems. All rights reserved.
      </p>
    </footer>
  )
}
