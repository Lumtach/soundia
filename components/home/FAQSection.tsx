"use client";

import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function FAQSection({
  copy
}: {
  copy: { label: string; items: { question: string; answer: string }[] };
}) {
  return (
    <section className="faq section" aria-labelledby="faq-title">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 id="faq-title" className="visually-hidden">
          FAQ
        </h2>
        <div className="faq__layout">
          <div className="faq__mark" aria-hidden="true">
            <span>F</span>
            <span>A</span>
            <span>Q</span>
          </div>
          <div className="faq__items">
            {copy.items.map((item, index) => (
              <details key={item.question} className="faq-item">
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <i aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
