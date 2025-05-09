// components/BookDescription.tsx
export function BookDescription({ text }: { text?: string }) {
  if (!text) return null;

  // Split text by double newlines to create paragraphs
  const paragraphs = text.split("\n\n");

  return (
    <div className="space-y-4 text-base leading-relaxed mb-4">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-gray-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
