import {
  mdiCalendarClockOutline,
  mdiMapMarkerOutline,
  mdiSchoolOutline,
} from "@mdi/js";
import { Icon } from "@/components/ui/Icon";
import type { FactId } from "@/content/types";

const icons: Record<FactId, string> = {
  location: mdiMapMarkerOutline,
  experience: mdiCalendarClockOutline,
  education: mdiSchoolOutline,
};

export function FactIcon({ id }: { id: FactId }) {
  return <Icon path={icons[id]} className="size-4 shrink-0" />;
}
