"use client"

import { useState } from "react"

interface StripePaymentButtonProps {
  amount: number
  currency: string
}

export default function StripePaymentButton({ amount, currency }: StripePaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, currency }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`
    } catch (err) {
      console.error("Payment error:", err)
      setError("Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-[var(--primary-color,green)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Proceed to Payment ($1.00)"}
      </button>

      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">❌ {error}</div>}

      <p className="mt-4 text-sm text-gray-500 text-center">Secure payment powered by Stripe</p>
    </div>
  )
}
