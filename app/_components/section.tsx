export const Section = ({
  children,
  title,
  subtitle,
}: {
  children?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
}) => {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-1.5 text-center items-start">
        <h2 className="text-sm font-bold">{title}</h2>
        {subtitle && (
          <div className="text-sm max-w-xs text-dark-gray10 text-balance">
            {subtitle}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-start">{children}</div>
    </section>
  )
}
