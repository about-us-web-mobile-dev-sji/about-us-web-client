import type { OrgChartNode } from 'primeng/types/organizationchart';
import type { Space } from '../../domain/models/space.model';
import { SpaceKind, SpaceStatus } from '../../domain/models/space.model';

export function mapSpacesToOrgChartNodes(spaces: Space[]): OrgChartNode<Space>[] {
  if (spaces.length === 0) {
    return [];
  }

  const visibleSpaces = spaces.filter((space) => !space.deletedAt);
  const nodesById = new Map<string, OrgChartNode<Space>>();

  for (const space of visibleSpaces) {
    nodesById.set(space.id, {
      key: space.id,
      label: space.name,
      data: space,
      styleClass: getNodeStyleClass(space),
      children: [],
      collapsedByDefault: space.depth > 1,
    });
  }

  const roots: OrgChartNode<Space>[] = [];

  for (const space of visibleSpaces) {
    const node = nodesById.get(space.id);
    if (!node) {
      continue;
    }

    const parentId = space.parentId;
    if (parentId && nodesById.has(parentId)) {
      const parent = nodesById.get(parentId)!;
      parent.children = parent.children ?? [];
      parent.children.push(node);
    } else if (space.kind === SpaceKind.SCHOOL_ROOT || !parentId) {
      roots.push(node);
    }
  }

  if (roots.length === 0) {
    const minDepth = Math.min(...visibleSpaces.map((space) => space.depth));
    return visibleSpaces
      .filter((space) => space.depth === minDepth)
      .map((space) => nodesById.get(space.id)!)
      .filter(Boolean);
  }

  sortTreeByName(roots);
  return roots;
}

function sortTreeByName(nodes: OrgChartNode<Space>[]): void {
  nodes.sort((a, b) => (a.label ?? '').localeCompare(b.label ?? '', 'fr'));
  for (const node of nodes) {
    if (node.children?.length) {
      sortTreeByName(node.children);
    }
  }
}

function getNodeStyleClass(space: Space): string {
  const classes = ['space-org-node'];
  if (space.kind === SpaceKind.SCHOOL_ROOT) {
    classes.push('space-org-node--root');
  }
  if (space.status === SpaceStatus.ARCHIVED) {
    classes.push('space-org-node--archived');
  }
  return classes.join(' ');
}
