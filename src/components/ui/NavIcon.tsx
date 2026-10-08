import {
  mdiAccountOutline,
  mdiBriefcaseOutline,
  mdiEmailOutline,
  mdiLayersOutline,
  mdiViewGridOutline,
} from "@mdi/js";
import { Icon } from "@/components/ui/Icon";

export type NavId = "about" | "skills" | "experience" | "projects" | "contact";

const icons: Record<NavId, string> = {
  about: mdiAccountOutline,
  skills: mdiLayersOutline,
  experience: mdiBriefcaseOutline,
  projects: mdiViewGridOutline,
  contact: mdiEmailOutline,
};

export function NavIcon({ id }: { id: NavId }) {
  return <Icon path={icons[id]} />;
}
