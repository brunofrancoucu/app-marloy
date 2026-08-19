import SignupForm from '@/components/forms/Signup'
import Image from 'next/image'
import { getDictionary, Locale } from '@/lib/services/language/server'

export default async function SignupPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full">
      {/* Left Side Image */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop"
          alt="Coffee beans being roasted"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
              {dict.signupPage.title_start}{' '}
              <span className="text-primary">
                {dict.signupPage.title_highlight}
              </span>{' '}
              {dict.signupPage.title_end}
            </h1>
            <p className="mt-3 text-foreground/60">
              {dict.signupPage.description}
            </p>
          </div>

          <SignupForm dict={dict.signupForm} />
        </div>
      </div>
    </div>
  )
}
