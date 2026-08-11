/*
Main Page
- Welcome
- NavBar login
- Hero / CTA
*/
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
        {/* Left Side: Copy and CTAs */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-heading text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Master Your <br className="hidden lg:block" />
            <span className="text-primary">Coffee Shop</span> Operations.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80 sm:text-xl lg:mx-0">
            From raw bean inventory tracking to complex barista scheduling,
            streamline every drop of your daily operations with our all-in-one
            management platform.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/signup"
              className="rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="rounded-full border-2 border-foreground/20 px-8 py-4 text-lg font-bold transition-all hover:border-primary hover:text-primary"
            >
              Book a Demo
            </Link>
          </div>
        </div>

        {/* Right Side: Hero Image */}
        <div className="hidden w-full flex-1 lg:block">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] shadow-2xl lg:aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"
              alt="Barista processing an order at a modern espresso machine"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
