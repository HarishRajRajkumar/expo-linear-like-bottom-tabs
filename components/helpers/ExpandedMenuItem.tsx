import { SPRING_CONFIG } from "@/constants";
import { ExpandedMenuItemProps } from "@/typings";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { styles } from "@/stylesheet";

const ExpandedMenuItems: React.FC<ExpandedMenuItemProps> = ({
  item,
  index,
  animationProgress,
  isSelected,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const startThreshold = 0.4;

    const staggerDelay = index * 0.05;
    const itemStartThreshold = startThreshold + staggerDelay;
    const itemEndThreshold = Math.min(itemStartThreshold + 0.3, 1);

    const itemProgress = interpolate(
      animationProgress.value,
      [itemStartThreshold, itemEndThreshold],
      [0, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      itemProgress,
      [0, 0.5, 1],
      [0, 0.8, 1],
      Extrapolation.CLAMP
    );

    const translateY = withSpring(
      interpolate(itemProgress, [0, 1], [40, 0], Extrapolation.CLAMP),
      SPRING_CONFIG
    );

    const scale = withSpring(
      interpolate(
        itemProgress,
        [0, 0.8, 1],
        [0.7, 1.02, 1],
        Extrapolation.CLAMP
      ),
      SPRING_CONFIG
    );

    const isInteractive = animationProgress.value > 0.7;

    return {
      opacity,
      transform: [{ translateY }, { scale }],
      pointerEvents: isInteractive ? "auto" : "none",
    };
  });

  const animatedSelectionStyle = useAnimatedStyle(() => {
    const scale = isSelected ? 1 : 0.95;
    const opacity = isSelected ? 0.15 : 0;

    return {
      opacity: opacity,
      transform: [
        {
          scale: withSpring(scale, SPRING_CONFIG),
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.menuItem}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        accessibilityState={{ selected: isSelected }}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.menuItemBackground,
            animatedSelectionStyle,
          ]}
        />

        <View style={styles.menuIconContainer}>
          <Ionicons
            name={item.iconName}
            size={20}
            color={isSelected ? "#FFFFFF" : "#AAAAAA"}
          />
        </View>

        <Text
          style={[
            styles.menuLabel,
            { color: isSelected ? "#FFFFFF" : "#AAAAAA" },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export { ExpandedMenuItems };
