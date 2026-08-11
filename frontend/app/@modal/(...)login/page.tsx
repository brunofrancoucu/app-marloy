import LoginForm from '@/components/forms/Login'
import Modal from '@/components/Modal' // Your generic dialog/modal component

export default function LoginModal() {
  return (
    <Modal>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Manager Access
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Please sign in to manage your BrewBase dashboard.
        </p>
      </div>
      <LoginForm />
      {/* Your login form here */}
    </Modal>
  )
}
