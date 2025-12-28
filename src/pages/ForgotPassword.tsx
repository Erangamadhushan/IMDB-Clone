export const ForgotPassword = () => {
  return (
    <div className="flex flex-col gap-5 items-center bg-linear-to-r from-red-950 via-red-800 to-red-950 justify-center min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="px-8 pt-6">
        <button
          onClick={() => window.history.back()}
          className="text-yellow-400 hover:text-yellow-300 transition font-medium"
        >
          ← Back to Home
        </button>
      </div>
      <div className="bg-gray-950 text-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">Forgot Password</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-yellow-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
