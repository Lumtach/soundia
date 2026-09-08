import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection({
  copy
}: {
  copy: { label: string; headline: string[]; body: string; metrics: { value: string; label: string }[] };
}) {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <div className="about__grid">
          <h2 id="about-title" className="about__title">
            {copy.headline.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </h2>
          <div className="about__body">
            <p>{copy.body}</p>
            <div className="about__metrics">
              {copy.metrics.map((metric) => (
                <div key={metric.value}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
