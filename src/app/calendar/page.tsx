import Link from "next/link";
import LearningToolsContainer from "@/components/calendar/LearningToolsContainer";

export const metadata = {
  title: "Calendar - Educational Platform",
  description: "View and manage your learning schedule",
};

export default function Calendar() {
  const upcomingEvents = [
    { date: "Dec 1", title: "TypeScript Basics", time: "10:00 AM" },
    { date: "Dec 3", title: "React Fundamentals", time: "2:00 PM" },
    { date: "Dec 5", title: "Next.js Deep Dive", time: "11:00 AM" },
    { date: "Dec 7", title: "Testing Best Practices", time: "3:00 PM" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block mb-6 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            📅 Learning Calendar
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Track your scheduled learning sessions and explore the Aztec calendar system
          </p>
        </div>

        {/* Learning Tools */}
        <div className="mb-12">
          <LearningToolsContainer />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Upcoming Learning Events
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-primary-200 bg-white p-6 shadow-md hover:shadow-lg dark:border-primary-800 dark:bg-gray-800"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100">
                    {event.date}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.time}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            How to Use the Calendar
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>✓ Check upcoming learning sessions</li>
            <li>✓ Explore the Aztec calendar system above</li>
            <li>✓ Learn about the 260-day tonalpohualli cycle</li>
            <li>✓ Discover the 365-day xiuhpohualli solar calendar</li>
            <li>✓ Track your progress over time</li>
            <li>✓ Set reminders for important milestones</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
