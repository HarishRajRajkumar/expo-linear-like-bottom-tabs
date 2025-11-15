import { styles } from "@/stylesheet";
import { AnimatedTabProps } from "@/typings";
import { triggerHaptics } from "@/utils/trigger-haptics";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedTab: React.FC<AnimatedTabProps> = ({
  isFocused,
  options,
  colors,
  onPress,
  onLongPress,
  animationProgress,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    triggerHaptics();
    scale.value = withTiming(isFocused ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isFocused, scale]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [0, 1]);
    return {
      opacity,
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [0.8, 1]),
        },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.25, 0.4],
      [1, 0.5, 0],
      Extrapolation.CLAMP
    );

    const counterScale = interpolate(
      animationProgress.value,
      [0, 0.5, 1],
      [1, 0.5, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale: counterScale }],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <Animated.View style={[styles.tabBackground, animatedBackgroundStyle]} />
      <Animated.View style={animatedIconStyle}>
        {options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? colors.primary : colors.text,
            size: 24,
          })}
      </Animated.View>
    </TouchableOpacity>
  );
};

export { AnimatedTab };
