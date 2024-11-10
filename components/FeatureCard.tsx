export function FeatureCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="group relative bg-white dark:bg-neutral-800 shadow-lg p-4 rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="absolute inset-0 opacity-0  transition-opacity duration-300 bg-primary rounded-lg" />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="text-4xl text-primary mb-4">{icon}</div>
        <h3 className="text-sm font-semibold text-center text-neutral-700 dark:text-neutral-200">
          {title}
        </h3>
      </div>
    </div>
  );
}
