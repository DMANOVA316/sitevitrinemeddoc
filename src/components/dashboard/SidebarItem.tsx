import { NavLink } from "react-router-dom";

export const SidebarItem = () => {
  return (
    <NavLink
      key={subIndex}
      to={subItem.href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-primary/5",
        )
      }
    >
      <subItem.icon className="h-4 w-4" />
      {subItem.title}
    </NavLink>
  );
};
