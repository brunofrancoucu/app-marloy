import Modal from '@/components/Modal'
import SignupForm from '@/components/forms/Signup'
import { getDictionary, Locale } from '@/lib/services/language/server'

export default async function SignupModal({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <Modal>
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          {dict.signupModal.title}
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          {dict.signupModal.description}
        </p>
      </div>
      <SignupForm dict={dict.signupForm} />
    </Modal>
  )
}
