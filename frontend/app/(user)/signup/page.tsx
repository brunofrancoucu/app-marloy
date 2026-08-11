import SignupForm from '@/components/forms/Signup'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full">
      {/* Left Side Image - Hidden on mobile, 50% width on desktop */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop"
          alt="Coffee beans being roasted"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />{' '}
        {/* Dark overlay to make it look premium */}
      </div>

      {/* Right Side Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground">
              Start your <span className="text-primary">BrewBase</span> journey.
            </h1>
            <p className="mt-3 text-foreground/60">
              Create your manager account today and take full control of your
              shop's daily operations.
            </p>
          </div>

          <SignupForm />
        </div>
      </div>
    </div>
  )
}
