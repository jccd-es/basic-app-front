import React from "react";
import { matchPath } from "react-router-dom";

import SidebarNavListItem from "./SidebarNavListItem";
import SidebarNavList from "./SidebarNavList";
import { useTranslation } from "react-i18next";

const reduceChildRoutes = (props) => {
  const { items, page, depth, currentRoute } = props;
  const { t } = useTranslation();

  if (page.children) {
    const open = page.href
      ? !!matchPath(
          {
            path: page.href,
            end: false,
          },
          currentRoute
        )
      : false;

    items.push(
      <SidebarNavListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        open={!!open}
        title={t(page.title)}
        href={page.href}
      >
        <SidebarNavList depth={depth + 1} pages={page.children} />
      </SidebarNavListItem>
    );
  } else {
    items.push(
      <SidebarNavListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        badge={page.badge}
        title={t(page.title)}
      />
    );
  }

  return items;
};

export default reduceChildRoutes;
