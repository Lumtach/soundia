import { Waveform } from "@/components/audio/Waveform";
import { Container } from "@/components/ui/Container";

export function SoundExperience({
  copy
}: {
  copy: { headline: string[]; text: string };
}) {
  return (
    <section className="sound-experience" aria-labelledby="sound-title">
      <Container>
        <div className="sound-experience__grid">
          <h2 id="sound-title">
            {copy.headline.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </h2>
          <div className="sound-experience__text">
            <p>{copy.text}</p>
            <div className="sound-experience__tags" aria-hidden="true">
              <span>Voice</span>
              <span>Silence</span>
              <span>Rhythm</span>
              <span>Space</span>
            </div>
          </div>
          <div className="sound-experience__wave" aria-hidden="true">
            <span className="sound-experience__wave-label">Frequency study</span>
            <Waveform dark />
          </div>
        </div>
      </Container>
    </section>
  );
}
