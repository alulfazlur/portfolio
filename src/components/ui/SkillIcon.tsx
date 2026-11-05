import {
  mdiCodeTags,
  mdiDatabaseOutline,
  mdiPaletteOutline,
  mdiServerOutline,
  mdiStarFourPointsOutline,
} from "@mdi/js";
import { Icon } from "@/components/ui/Icon";
import type { SkillGroupId } from "@/content/types";

const icons: Record<SkillGroupId, string> = {
  core: mdiCodeTags,
  styling: mdiPaletteOutline,
  data: mdiDatabaseOutline,
  backend: mdiServerOutline,
  also: mdiStarFourPointsOutline,
};

export function SkillIcon({ id }: { id: SkillGroupId }) {
  return <Icon path={icons[id]} />;
}
