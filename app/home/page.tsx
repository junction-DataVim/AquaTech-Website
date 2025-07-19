export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to AquaTech Home</h1>
        <p className="text-gray-300 mb-8">
          This is your personalized home page where you can access all your aquaculture management tools.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Quick Stats</h3>
            <p className="text-gray-400">View your farm statistics at a glance</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
            <p className="text-gray-400">Check your latest farm activities</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Alerts</h3>
            <p className="text-gray-400">Monitor important notifications</p>
          </div>
        </div>
      </div>
    </div>
  )
}
