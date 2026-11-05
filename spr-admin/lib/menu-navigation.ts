import type { MenuItem } from "@/spr-admin/services/menu.service";

function getBranchIds(item: MenuItem): string[] {
  return [
    item.id || item.href,
    ...(item.children ?? []).flatMap((child) => getBranchIds(child)),
  ];
}

export function toggleMenuBranch(
  expandedIds: Set<string>,
  itemId: string | undefined,
  siblings: MenuItem[],
): Set<string> {
  if (!itemId) return expandedIds;

  const item = siblings.find((sibling) => (sibling.id || sibling.href) === itemId);
  if (!item) return expandedIds;

  const nextExpandedIds = new Set(expandedIds);
  const branchIds = getBranchIds(item);

  if (nextExpandedIds.has(itemId)) {
    branchIds.forEach((id) => nextExpandedIds.delete(id));
    return nextExpandedIds;
  }

  siblings
    .filter((sibling) => sibling !== item)
    .flatMap((sibling) => getBranchIds(sibling))
    .forEach((id) => nextExpandedIds.delete(id));

  nextExpandedIds.add(itemId);
  return nextExpandedIds;
}
