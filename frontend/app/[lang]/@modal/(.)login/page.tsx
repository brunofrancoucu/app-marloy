import LoginForm from '@/components/forms/Login'
import Modal from '@/components/Modal' // Your generic dialog/modal component[cite: 23]
import { getDictionary, Locale } from '@/lib/services/language/server'

export default async function LoginModal({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <Modal>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          {dict.loginModal.title}
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          {dict.loginModal.description}
        </p>
      </div>
      <LoginForm dict={dict.loginForm} />
      {/* Your login form here */}
    </Modal>
  )
}
