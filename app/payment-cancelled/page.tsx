import Link from "next/link"

export default function PaymentCancelled() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Payment Cancelled</h1>

        <div className="text-center my-8">
          <p className="text-xl mb-4">❌ Payment failed. Please try again.</p>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="block w-full bg-[var(--accent-color,blue)] text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
