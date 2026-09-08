import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ClientsSection({
  copy
}: {
  copy: { label: string; headline: string; list: string[] };
}) {
  return (
    <section className="clients section" aria-labelledby="clients-title">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 id="clients-title">{copy.headline}</h2>
        <ul>
          {copy.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
