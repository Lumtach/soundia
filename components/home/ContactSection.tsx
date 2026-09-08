import { Container } from "@/components/ui/Container";

export function ContactSection({
  copy
}: {
  copy: { headline: string[]; label: string };
}) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Container>
        <p className="section-label">{copy.label}</p>
        <h2 id="contact-title">
          {copy.headline.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
