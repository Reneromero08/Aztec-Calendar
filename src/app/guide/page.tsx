import Link from "next/link";

export const metadata = {
  title: "Learning Guides - Educational Platform",
  description: "Access comprehensive learning guides and resources",
};

export default function Guide() {
  const guides = [
    {
      title: "Aztec Calendar Interpretation Guide",
      description:
        "Learn to read and interpret the Aztec calendar system with day signs, numbers, and cultural context",
      level: "All Levels",
      href: "/guide/aztec-calendar",
    },
    {
      title: "Getting Started with Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript",
      level: "Beginner",
      href: null,
    },
    {
      title: "React Component Patterns",
      description:
        "Master advanced patterns for building scalable React applications",
      level: "Intermediate",
      href: null,
    },
    {
      title: "Full-Stack Development with Next.js",
      description: "Build complete full-stack applications with Next.js 14",
      level: "Advanced",
      href: null,
    },
    {
      title: "Testing Strategies",
      description: "Learn unit, integration, and end-to-end testing approaches",
      level: "Intermediate",
      href: null,
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "All Levels":
        return "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block mb-6 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            📚 Learning Guides
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Comprehensive guides to help you master essential skills
          </p>
        </div>

        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="rounded-lg border-2 border-accent-200 bg-white p-6 shadow-md hover:shadow-lg dark:border-accent-800 dark:bg-gray-800"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {guide.title}
                </h3>
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${getLevelColor(guide.level)}`}
                >
                  {guide.level}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {guide.description}
              </p>
              {guide.href ? (
                <Link
                  href={guide.href}
                  className="mt-4 inline-block rounded-lg bg-accent-600 px-4 py-2 text-white transition-colors hover:bg-accent-700 dark:hover:bg-accent-800"
                >
                  Start Learning →
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-4 rounded-lg bg-gray-400 px-4 py-2 text-white cursor-not-allowed"
                  aria-label="Coming soon"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Tips for Effective Learning
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>🎯 Set clear learning objectives for each session</li>
            <li>💡 Practice concepts as you learn them</li>
            <li>📝 Take notes and create your own examples</li>
            <li>🔄 Review and reinforce learned concepts regularly</li>
            <li>🤝 Join community discussions and share knowledge</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
