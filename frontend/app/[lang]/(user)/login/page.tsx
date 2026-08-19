import LoginForm from '@/components/forms/Login'
import Image from 'next/image'
import { getDictionary, Locale } from '@/lib/services/language/server'

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full">
      {/* Left Side Image - Hidden on mobile, 50% width on desktop */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
          alt="Fresh espresso pouring into a cup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
              {dict.loginPage.title_start}{' '}
              <span className="text-primary">
                {dict.loginPage.title_highlight}
              </span>
            </h1>
            <p className="mt-3 text-foreground/60">
              {dict.loginPage.description}
            </p>
          </div>

          <LoginForm dict={dict.loginForm} />
        </div>
      </div>
    </div>
  )
}
