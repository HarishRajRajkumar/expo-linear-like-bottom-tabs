import type { ExpandedMenuItem } from "@/typings";
import { Dimensions } from "react-native";

const WIDTH: number = Dimensions.get("window").width;
const ANIMATION_DURATION = 400;
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 190,
  mass: 0.8,
};

const EXPANDED_MENU_ITEMS: ExpandedMenuItem[] = [
  {
    iconName: "home",
    label: "Home",
    route: "index",
  },
  { iconName: "file-tray", label: "Inbox", route: "inbox" },
  { iconName: "git-compare", label: "My Issues", route: "my-issues" },
  { iconName: "flash", label: "Pulse", route: "pulse" },
  { iconName: "file-tray-stacked", label: "View", route: "view" },
  { iconName: "rocket", label: "Initiatives", route: "initiatives" },
  { iconName: "cube", label: "Projects", route: "projects" },
  { iconName: "settings", label: "Settings", route: "settings" },
];

export { ANIMATION_DURATION, EXPANDED_MENU_ITEMS, SPRING_CONFIG, WIDTH };
