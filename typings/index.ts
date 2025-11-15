import { Ionicons } from "@expo/vector-icons";
import type { SharedValue } from "react-native-reanimated";

type HapticFeedBackWeight = "soft" | "normal" | "heavy";

interface AnimatedTabProps {
  isFocused: boolean;
  options: any;
  colors: {
    primary: string;
    text: string;
  };
  onPress: () => void;
  onLongPress: () => void;
  animationProgress: SharedValue<number>;
  index: number;
}

interface DummyTabProps {
  animationProgress: SharedValue<number>;
  onPress?: () => void;
  colors: {
    primary: string;
    text: string;
  };
}

interface ExpandedMenuItem {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
}

interface ExpandedMenuItemProps {
  item: ExpandedMenuItem;
  index: number;
  animationProgress: SharedValue<number>;
  totalItems: number;
  isSelected: boolean;
  onPress: () => void;
}

interface FavoriteItem {
  id: string;
  title: string;
  checked: boolean;
  icon?: "loading" | "clock" | null;
}

interface TeamItem {
  id: string;
  name: string;
  icon?: string;
}

export {
  AnimatedTabProps,
  DummyTabProps,
  ExpandedMenuItem,
  ExpandedMenuItemProps,
  FavoriteItem,
  HapticFeedBackWeight,
  TeamItem,
};
