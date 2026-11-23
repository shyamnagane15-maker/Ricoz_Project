export default function Field({ id, label, error, hint, ...props }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-udaan-navy">{label}</label>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        className="mt-1 w-full rounded-md border border-udaan-muted bg-white px-3 py-3 text-udaan-ink"
        {...props}
      />
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-udaan-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-sm font-medium text-red-700">{error}</p>}
    </div>
  )
}