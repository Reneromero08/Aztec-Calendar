import GuideLayout, { type GuideSection } from "@/components/guide/GuideLayout";
import DaySignCard from "@/components/guide/DaySignCard";
import NumberCard from "@/components/guide/NumberCard";
import MonthCard from "@/components/guide/MonthCard";
import {
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
} from "@/lib/aztec-calendar";
import Link from "next/link";

export const metadata = {
  title: "Aztec Calendar Interpretation Guide - Educational Platform",
  description:
    "Learn how to read and interpret the Aztec calendar system, including day signs, numbers, and months with deep cultural context.",
};

const sections: GuideSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Overview of the Aztec calendar system",
  },
  {
    id: "tonalpohualli",
    title: "Tonalpohualli (260-Day Cycle)",
    description: "The sacred divinatory calendar",
  },
  {
    id: "day-signs",
    title: "The 20 Day Signs",
    description: "Symbolic meanings of each day",
  },
  {
    id: "numbers",
    title: "The 13 Numbers",
    description: "Numerological significance",
  },
  {
    id: "xiuhpohualli",
    title: "Xiuhpohualli (365-Day Cycle)",
    description: "The solar agricultural calendar",
  },
  {
    id: "months",
    title: "The 18 Months",
    description: "Seasonal and ceremonial cycles",
  },
  {
    id: "reading-guide",
    title: "How to Read Your Date",
    description: "Step-by-step interpretation",
  },
  {
    id: "cultural-context",
    title: "Cultural Context",
    description: "Historical and spiritual significance",
  },
];

export default function AztecCalendarGuidePage() {
  return (
    <GuideLayout
      title="Aztec Calendar Interpretation Guide"
      intro="Explore the rich symbolism and cultural significance of the Aztec calendar system, including the 260-day tonalpohualli and 365-day xiuhpohualli cycles."
      sections={sections}
    >
      <section id="introduction" aria-labelledby="introduction-heading">
        <h2
          id="introduction-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Introduction to the Aztec Calendar System
        </h2>
        <p>
          The Aztec calendar is one of the most sophisticated timekeeping
          systems ever developed in ancient Mesoamerica. It consists of two
          interlocking cycles that work together to create a rich tapestry of
          temporal, spiritual, and agricultural significance.
        </p>
        <p>
          Unlike the Gregorian calendar we use today, the Aztec calendar was
          designed not just to track time, but to understand the cosmic forces
          influencing each day and to guide daily life decisions, agricultural
          practices, and spiritual ceremonies.
        </p>

        <div className="my-6 rounded-lg bg-accent-50 p-6 dark:bg-accent-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            The Two Calendars
          </h3>
          <ul className="space-y-3">
            <li>
              <strong className="text-accent-700 dark:text-accent-300">
                Tonalpohualli (260 days):
              </strong>{" "}
              The sacred divinatory calendar used for rituals, divination, and
              determining auspicious days.
            </li>
            <li>
              <strong className="text-accent-700 dark:text-accent-300">
                Xiuhpohualli (365 days):
              </strong>{" "}
              The solar agricultural calendar that tracked seasons, harvests,
              and annual ceremonies.
            </li>
          </ul>
        </div>

        <p>
          Together, these two calendars created the{" "}
          <strong>Calendar Round</strong>, a 52-year cycle that represented a
          complete lifetime in Aztec cosmology. At the end of each 52-year
          cycle, the Aztecs performed the{" "}
          <em>New Fire Ceremony</em> to ensure the continuation of the world.
        </p>

        <nav aria-label="Quick navigation to calendar sections" className="mt-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="#tonalpohualli"
              className="rounded-lg border-2 border-accent-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-accent-700 dark:bg-gray-800"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Learn about Tonalpohualli →
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Explore the 260-day sacred calendar
              </p>
            </Link>
            <Link
              href="#xiuhpohualli"
              className="rounded-lg border-2 border-accent-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-accent-700 dark:bg-gray-800"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Learn about Xiuhpohualli →
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Discover the 365-day solar calendar
              </p>
            </Link>
          </div>
        </nav>
      </section>

      <section
        id="tonalpohualli"
        aria-labelledby="tonalpohualli-heading"
        className="mt-12"
      >
        <h2
          id="tonalpohualli-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          The Tonalpohualli: Sacred 260-Day Calendar
        </h2>
        <p>
          The tonalpohualli, meaning &quot;count of days&quot; in Nahuatl, is a
          260-day cycle that combines 20 day signs with 13 numbers. Each day
          has a unique name formed by pairing one of the 20 day signs with one
          of the 13 numbers (e.g., &quot;1 Crocodile&quot;, &quot;2
          Wind&quot;).
        </p>

        <div className="my-6 rounded-lg bg-primary-50 p-6 dark:bg-primary-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Why 260 Days?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The 260-day cycle has several interpretations:
          </p>
          <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              • <strong>Human gestation:</strong> Approximately 9 months, the
              duration of human pregnancy
            </li>
            <li>
              • <strong>Agricultural cycle:</strong> The growing season for corn
              in central Mexico
            </li>
            <li>
              • <strong>Venus cycle:</strong> Related to the appearance of Venus
              in the sky
            </li>
            <li>
              • <strong>Sacred mathematics:</strong> 13 × 20, numbers with deep
              cosmological significance
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
          Trecenas: 13-Day Periods
        </h3>
        <p>
          The tonalpohualli is divided into 20 trecenas (13-day periods). Each
          trecena is ruled by a specific deity and has its own character and
          influence. Days within the same trecena share certain qualities and
          are considered related to each other.
        </p>

        <div className="my-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              20
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Day Signs
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              13
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Numbers
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              260
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Unique Days
            </div>
          </div>
        </div>
      </section>

      <section
        id="day-signs"
        aria-labelledby="day-signs-heading"
        className="mt-12"
      >
        <h2
          id="day-signs-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          The 20 Day Signs (Tonalli)
        </h2>
        <p className="mb-6">
          Each of the 20 day signs represents a specific energy, quality, and
          set of associations. These signs repeat throughout the 260-day cycle,
          combining with different numbers to create unique day energies.
          Understanding your day sign is considered essential for understanding
          your character and destiny in Aztec cosmology.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {daySigns.map((daySign) => (
            <DaySignCard
              key={daySign.position}
              daySign={daySign}
              showDetailLink={false}
            />
          ))}
        </div>
      </section>

      <section id="numbers" aria-labelledby="numbers-heading" className="mt-12">
        <h2
          id="numbers-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          The 13 Sacred Numbers
        </h2>
        <p className="mb-6">
          The 13 numbers of the tonalpohualli each carry their own energy and
          meaning, alternating between masculine and feminine qualities. They
          modify and enhance the energy of the day sign they&apos;re paired
          with, creating a nuanced interpretation of each day.
        </p>

        <div className="my-6 rounded-lg bg-primary-50 p-6 dark:bg-primary-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Number Symbolism in Aztec Cosmology
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The number 13 was considered sacred and represented the 13 levels
            of heaven in Aztec cosmology. Each number has progressively deeper
            spiritual significance, from unity (1) through completion and
            transcendence (13).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tonalpohualliNumbers.map((number) => (
            <NumberCard
              key={number.value}
              number={number}
              showDetailLink={false}
            />
          ))}
        </div>
      </section>

      <section
        id="xiuhpohualli"
        aria-labelledby="xiuhpohualli-heading"
        className="mt-12"
      >
        <h2
          id="xiuhpohualli-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          The Xiuhpohualli: Solar 365-Day Calendar
        </h2>
        <p>
          The xiuhpohualli (&quot;year count&quot;) is the agricultural and
          civil calendar of the Aztecs. It consists of 18 months of 20 days
          each (360 days), plus a 5-day period called <em>nemontemi</em>{" "}
          (empty days) to complete the solar year.
        </p>

        <div className="my-6 rounded-lg bg-emerald-50 p-6 dark:bg-emerald-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Agricultural Significance
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Each of the 18 months was associated with specific agricultural
            activities, seasonal changes, and religious ceremonies. The calendar
            guided farmers on when to plant, tend, and harvest crops, ensuring
            the survival and prosperity of Aztec society.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
          The Nemontemi: Empty Days
        </h3>
        <p>
          The final 5 days of the xiuhpohualli were called nemontemi, meaning
          &quot;worthless&quot; or &quot;empty days.&quot; These were
          considered unlucky and dangerous times when the barriers between the
          physical and spiritual worlds were thin. People avoided important
          activities and stayed indoors when possible.
        </p>
      </section>

      <section id="months" aria-labelledby="months-heading" className="mt-12">
        <h2
          id="months-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          The 18 Months (Veintenas)
        </h2>
        <p className="mb-6">
          Each month of 20 days was dedicated to specific deities and featured
          unique ceremonies and festivals. The months followed the agricultural
          cycle and seasonal changes in the Valley of Mexico.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {xiuhpohualliMonths.map((month) => (
            <MonthCard key={month.position} month={month} />
          ))}
        </div>
      </section>

      <section
        id="reading-guide"
        aria-labelledby="reading-guide-heading"
        className="mt-12"
      >
        <h2
          id="reading-guide-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          How to Read Your Aztec Calendar Date
        </h2>
        <p className="mb-6">
          Learning to interpret your Aztec calendar date involves understanding
          both the tonalpohualli and xiuhpohualli components and how they work
          together to create meaning.
        </p>

        <div className="space-y-6">
          <article className="rounded-lg border-2 border-accent-300 bg-white p-6 dark:border-accent-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 1: Find Your Day Sign
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your day sign is one of the 20 tonalli (day signs) and represents
              your core character, natural talents, and life path. Look up your
              birth date using the{" "}
              <Link
                href="/calendar"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                Aztec calendar converter
              </Link>
              .
            </p>
          </article>

          <article className="rounded-lg border-2 border-accent-300 bg-white p-6 dark:border-accent-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 2: Understand Your Number
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              The number (1-13) paired with your day sign modifies its energy.
              Lower numbers (1-3) represent beginnings and growth, middle
              numbers (4-10) represent development and maturity, and higher
              numbers (11-13) represent culmination and transcendence.
            </p>
          </article>

          <article className="rounded-lg border-2 border-accent-300 bg-white p-6 dark:border-accent-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 3: Consider Your Trecena
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your trecena (13-day period) adds another layer of meaning. The
              first day sign of your trecena influences all days within that
              period, providing context for your specific day.
            </p>
          </article>

          <article className="rounded-lg border-2 border-accent-300 bg-white p-6 dark:border-accent-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 4: Explore Your Xiuhpohualli Month
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your birth month in the xiuhpohualli calendar connects you to
              specific agricultural and ceremonial cycles, seasonal energies,
              and patron deities. This provides insight into your relationship
              with nature and community.
            </p>
          </article>

          <article className="rounded-lg border-2 border-accent-300 bg-white p-6 dark:border-accent-700 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Step 5: Synthesize the Meanings
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Combine all these elements to understand your complete Aztec
              calendar profile. Look for themes and patterns that emerge across
              your day sign, number, trecena, and month. This holistic view
              reveals your unique place in the cosmic order.
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-primary-900/30 dark:to-accent-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Try It Yourself
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Visit the{" "}
            <Link
              href="/calendar"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              interactive calendar page
            </Link>{" "}
            to see today&apos;s Aztec date and explore the calendar wheel
            visualization. You can also convert any Gregorian date to its Aztec
            equivalent and learn about the associated energies.
          </p>
          <Link
            href="/calendar"
            className="inline-block rounded-lg bg-accent-600 px-6 py-3 text-white transition-colors hover:bg-accent-700 dark:hover:bg-accent-800"
          >
            Explore the Calendar →
          </Link>
        </div>
      </section>

      <section
        id="cultural-context"
        aria-labelledby="cultural-context-heading"
        className="mt-12"
      >
        <h2
          id="cultural-context-heading"
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Cultural Context and Spiritual Significance
        </h2>
        <p>
          The Aztec calendar was far more than a timekeeping device—it was a
          comprehensive worldview that integrated astronomy, mathematics,
          agriculture, religion, and philosophy into a unified system for
          understanding reality.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
          The Role of Tonalpohuaque (Calendar Keepers)
        </h3>
        <p>
          Specialized priests called tonalpohuaque were trained in the intricate
          art of calendar interpretation. They advised rulers on auspicious days
          for warfare and ceremonies, helped parents choose names for newborns
          based on their birth day, and guided individuals through life&apos;s
          important transitions.
        </p>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
          Modern Relevance
        </h3>
        <p>
          Today, many people of Mesoamerican descent continue to use variations
          of the ancient calendar system. The tonalpohualli, in particular, is
          still consulted for its divinatory wisdom and as a way to maintain
          connection with ancestral knowledge and indigenous identity.
        </p>

        <div className="my-6 rounded-lg bg-amber-50 p-6 dark:bg-amber-900/30">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            ⚠️ A Note on Cultural Respect
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            The Aztec calendar is a living cultural heritage for many indigenous
            communities. When engaging with this system, approach it with
            respect, cultural sensitivity, and awareness that it represents
            sacred knowledge developed over millennia. This guide is intended
            for educational purposes and to promote understanding of
            Mesoamerican astronomy and philosophy.
          </p>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
          Further Learning
        </h3>
        <p className="mb-4">
          To deepen your understanding of the Aztec calendar system, consider
          exploring:
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            • <strong>Codices:</strong> Study the Codex Borbonicus, Codex
            Magliabechiano, and other pre-Columbian manuscripts
          </li>
          <li>
            • <strong>Academic Works:</strong> Read scholarly texts on
            Mesoamerican astronomy and cosmology
          </li>
          <li>
            • <strong>Museums:</strong> Visit collections of Aztec artifacts,
            including calendar stones and codices
          </li>
          <li>
            • <strong>Cultural Centers:</strong> Connect with indigenous
            communities and cultural organizations preserving this knowledge
          </li>
        </ul>
      </section>

      <footer className="mt-12 border-t border-gray-300 pt-8 dark:border-gray-600">
        <nav aria-label="Guide navigation">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Link
              href="/calendar"
              className="inline-flex items-center rounded-lg border-2 border-primary-300 bg-white px-6 py-3 text-primary-700 transition-all hover:bg-primary-50 dark:border-primary-700 dark:bg-gray-800 dark:text-primary-300 dark:hover:bg-primary-900/30"
            >
              ← Back to Calendar
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center rounded-lg border-2 border-accent-300 bg-white px-6 py-3 text-accent-700 transition-all hover:bg-accent-50 dark:border-accent-700 dark:bg-gray-800 dark:text-accent-300 dark:hover:bg-accent-900/30"
            >
              View All Guides →
            </Link>
          </div>
        </nav>
      </footer>
    </GuideLayout>
  );
}
