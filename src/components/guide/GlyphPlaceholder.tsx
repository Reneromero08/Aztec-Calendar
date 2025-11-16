interface GlyphPlaceholderProps {
  label: string;
  description: string;
}

export default function GlyphPlaceholder({ label, description }: GlyphPlaceholderProps) {
  return (
    <figure className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 bg-white/70 p-6 text-center shadow-sm dark:border-gray-500 dark:bg-gray-800/80">
      <div
        role="img"
        aria-label={label}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-primary-500 text-2xl font-bold text-white shadow-lg"
      >
        {label.slice(0, 2).toUpperCase()}
      </div>
      <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </figcaption>
    </figure>
  );
}
