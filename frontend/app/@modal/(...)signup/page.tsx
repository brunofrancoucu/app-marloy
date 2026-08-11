import Modal from '@/components/Modal'
import SignupForm from '@/components/forms/Signup'

export default function SignupModal() {
  return (
    <Modal>
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Join BrewBase
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Create an account to streamline your coffee operations.
        </p>
      </div>
      <SignupForm />
    </Modal>
  )
}
