import { DummyTab } from "@/components/helpers/DummyTab";
import { ANIMATION_DURATION, EXPANDED_MENU_ITEMS, WIDTH } from "@/constants";
import { styles } from "@/stylesheet";
import { triggerHaptics } from "@/utils/trigger-haptics";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { AnimatedTab } from "../helpers/AnimatedTab";
import { ExpandedMenuItems } from "../helpers/ExpandedMenuItem";

interface LinearTabBarProps extends BottomTabBarProps {
  onLinearTabPress?: () => void | any;
  onMenuItemPress?: (index: number) => void | any;
}

export const LinearTabBar: React.FC<LinearTabBarProps> &
  React.FunctionComponent<LinearTabBarProps> = ({
  state,
  descriptors,
  navigation,
  onLinearTabPress = () => {},
  onMenuItemPress = (index: number) => {},
}): React.ReactNode & React.JSX.Element & React.ReactElement => {
  const { colors } = useTheme();
  const animationProgress = useSharedValue(0);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(2);

  const startY = useSharedValue(0);
  const translationY = useSharedValue(0);

  useEffect(() => {
    triggerHaptics();
  }, [selectedMenuIndex]);

  const updateSelectedIndex = (index: number): void => {
    setSelectedMenuIndex(index);
  };

  const panGesture = Gesture.Pan()
    .onStart(async (event) => {
      startY.value = event.absoluteY;
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    })
    .onUpdate((event) => {
      translationY.value = event.translationY;

      if (animationProgress.value > 0.8) {
        const menuHeight = 400;
        const itemHeight = menuHeight / EXPANDED_MENU_ITEMS.length;
        const relativeY = event.y;

        let newIndex = Math.floor(relativeY / itemHeight);
        newIndex = Math.max(
          0,
          Math.min(EXPANDED_MENU_ITEMS.length - 1, newIndex)
        );

        scheduleOnRN(updateSelectedIndex, newIndex);
      }
    })
    .onEnd((event) => {
      const velocity = event.velocityY;
      const threshold = 500;
      const route = EXPANDED_MENU_ITEMS[selectedMenuIndex].route;
      scheduleOnRN(onMenuItemPress, selectedMenuIndex);
      scheduleOnRN(navigation.navigate, {
        name: route,
        params: {},
      });

      if (velocity < -threshold && animationProgress.value === 0) {
        animationProgress.value = withTiming(1, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      } else if (velocity > threshold && animationProgress.value === 1) {
        animationProgress.value = withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      } else if (animationProgress.value > 0.8) {
        animationProgress.value = withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
      scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Light);
      translationY.value = 0;
    });

  const animatedTabBarStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationProgress.value,
      [0, 0.5, 1],
      [1, 0.5, 1],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      animationProgress.value,
      [0, 0.5, 1],
      [0, -10, -20],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const animatedFloatingBarStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animationProgress.value,
      [0, 0.4, 0.7, 1],
      [50, 50, 250, 400],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      animationProgress.value,
      [0, 0.2, 1],
      [25, 100, 40],
      Extrapolation.CLAMP
    );

    return {
      height,
      borderRadius,
      width: WIDTH - 150,
    };
  });

  const animatedOriginalTabBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.25, 0.4],
      [1, 0.2, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      pointerEvents: animationProgress.value > 0.25 ? "none" : "auto",
    };
  });

  const handleMenuItemPress = (index: number): void => {
    onMenuItemPress(index!);
    const selectedItem = EXPANDED_MENU_ITEMS[index];
    setSelectedMenuIndex(index);
    console.log(`Selected: ${EXPANDED_MENU_ITEMS[index].label}`);

    navigation.navigate(selectedItem.route);

    animationProgress.value = withTiming(0, {
      duration: ANIMATION_DURATION,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    animationProgress.value = withTiming(0, {
      duration: ANIMATION_DURATION,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const filteredRouteTabs = state.routes.filter((route) => {
    const { options } = descriptors[route.key];
    return options?.tabBarIcon !== undefined;
  });

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.container}>
          <Animated.View
            style={[
              styles.floatingBarWrapper,
              animatedFloatingBarStyle,
              animatedTabBarStyle,
            ]}
          >
            <BlurView tint="systemThickMaterialDark" style={styles.blurView}>
              <View style={styles.expandedMenu}>
                {EXPANDED_MENU_ITEMS.map((item, index) => (
                  <ExpandedMenuItems
                    key={index}
                    item={item}
                    index={index}
                    animationProgress={animationProgress}
                    totalItems={EXPANDED_MENU_ITEMS.length}
                    isSelected={selectedMenuIndex === index}
                    onPress={() => handleMenuItemPress(index)}
                  />
                ))}
              </View>

              <Animated.View
                style={[styles.floatingBar, animatedOriginalTabBarStyle]}
              >
                {filteredRouteTabs.map((route, index) => {
                  const { options } = descriptors[route.key];
                  const isFocused = state.index === state.routes.indexOf(route);

                  const onPress = (): void => {
                    const event = navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name, route.params);
                    }
                  };

                  const onLongPress = (): void => {
                    navigation.emit({
                      type: "tabLongPress",
                      target: route.key,
                    });
                  };

                  return (
                    <AnimatedTab
                      key={route.key}
                      isFocused={isFocused}
                      options={options}
                      colors={colors}
                      onPress={onPress}
                      onLongPress={onLongPress}
                      animationProgress={animationProgress}
                      index={index}
                    />
                  );
                })}

                <DummyTab
                  onPress={onLinearTabPress}
                  animationProgress={animationProgress}
                  colors={colors}
                />
              </Animated.View>
            </BlurView>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
