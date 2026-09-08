import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ProcessSection({
  copy
}: {
  copy: { label: string; headline: string; steps: { title: string; text: string }[] };
}) {
  const ticks = Array.from({ length: 13 });

  return (
    <section className="process section" aria-labelledby="process-title">
      <Container>
        <div className="process__header">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="process-title">{copy.headline}</h2>
        </div>

        <div className="process__score" role="list">
          {copy.steps.map((step, index) => (
            <article key={step.title} className="process-step" role="listitem">
              <span className="process-step__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="process-step__signal" aria-hidden="true">
                {ticks.map((_, tickIndex) => (
                  <i key={tickIndex} />
                ))}
              </div>
              <div className="process-step__copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
