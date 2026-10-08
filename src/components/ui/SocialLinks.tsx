import { socials } from "@/content/socials";
import { Pressable } from "@/components/motion/Pressable";
import { SocialIcon } from "./SocialIcon";

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-1">
      {socials.map((social) => {
        const external = !social.href.startsWith("mailto:");
        return (
          <li key={social.label}>
            <Pressable preset="icon">
              <a
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className={`inline-flex size-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-slate-400 dark:hover:bg-primary-500/10 dark:hover:text-primary-300`}
              >
                <SocialIcon label={social.label} />
              </a>
            </Pressable>
          </li>
        );
      })}
    </ul>
  );
}
