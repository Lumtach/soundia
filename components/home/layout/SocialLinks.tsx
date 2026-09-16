import type { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { contacts, type SocialLabel } from "@/lib/data";

const socialIcons: Record<SocialLabel, ReactNode> = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
  LinkedIn: <FaLinkedinIn />
};

export function SocialLinks({ className }: { className: string }) {
  return (
    <div className={className} aria-label="Social links">
      {contacts.socials.map((social) => (
        <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
          <span aria-hidden="true">{socialIcons[social.label]}</span>
        </a>
      ))}
    </div>
  );
}
