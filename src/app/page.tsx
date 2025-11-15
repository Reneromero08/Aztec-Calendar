import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-900 dark:text-primary-50 sm:text-5xl">
            Welcome to the Educational Platform
          </h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
            Explore learning guides, manage your schedule, and grow your knowledge.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Link
            href="/calendar"
            className="rounded-lg border-2 border-primary-200 bg-white p-6 shadow-md transition-all hover:border-primary-500 hover:shadow-lg dark:border-primary-800 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-2xl font-semibold text-primary-600 dark:text-primary-400">
              📅 Calendar
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              View your learning schedule and upcoming events.
            </p>
          </Link>

          <Link
            href="/guide"
            className="rounded-lg border-2 border-accent-200 bg-white p-6 shadow-md transition-all hover:border-accent-500 hover:shadow-lg dark:border-accent-800 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-2xl font-semibold text-accent-600 dark:text-accent-400">
              📚 Learning Guides
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Access comprehensive guides and learning materials.
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-lg border-2 border-blue-200 bg-white p-6 shadow-md transition-all hover:border-blue-500 hover:shadow-lg dark:border-blue-800 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              🏠 Home
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Return to the main platform hub.
            </p>
          </Link>
        </div>

        <div className="mt-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Getting Started
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            This platform provides a structured approach to learning and development:
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Track your learning progress with the integrated calendar</li>
            <li>Follow structured guides to master new topics</li>
            <li>Build a consistent learning habit</li>
            <li>Access resources whenever you need them</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
