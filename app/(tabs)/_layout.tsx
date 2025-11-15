import { LinearTabBar } from "@/components/";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router/tabs";
import React, { useState } from "react";
import {
  Appearance,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

Appearance.setColorScheme("dark");

enum TabAnimationName {
  Fade = "fade",
  Shift = "shift",
}

export default function RootLayout(): React.ReactNode {
  const blurOpacity = useSharedValue(0);
  const blurScale = useSharedValue(0.95);
  const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("none");

  // Update pointer events based on opacity
  useDerivedValue(() => {
    const shouldEnable = blurOpacity.value > 0.01;
    runOnJS(setPointerEvents)(shouldEnable ? "auto" : "none");
  });

  const handleLinearTabPress = () => {
    console.log("press");
    blurOpacity.value = withTiming(1, { duration: 300 });
    blurScale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handleMenuItemPress = () => {
    console.log("menu press");
    blurOpacity.value = withTiming(0, { duration: 200 });
    blurScale.value = withTiming(0.95, { duration: 200 });
  };

  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      opacity: blurOpacity.value,
      transform: [{ scale: blurScale.value }],
    };
  });

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <>
            {Platform.OS === "ios" ? (
              <View style={{ zIndex: 1000 }}>
                <LinearTabBar
                  {...props}
                  onLinearTabPress={handleLinearTabPress}
                  onMenuItemPress={handleMenuItemPress}
                />
              </View>
            ) : (
              <LinearTabBar
                {...props}
                onLinearTabPress={handleLinearTabPress}
                onMenuItemPress={handleMenuItemPress}
              />
            )}
          </>
        )}
        screenOptions={{
          headerShown: false,
          animation: TabAnimationName.Fade,
        }}
      >
        {/* Visible tabs */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({}) => (
              <>
                <MaterialIcons name="home-filled" size={24} color="#fff" />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            tabBarIcon: ({}) => (
              <>
                <Ionicons name="file-tray" size={24} color={"#fff"} />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="my-issues"
          options={{
            tabBarIcon: ({}) => (
              <>
                <MaterialIcons
                  name="filter-center-focus"
                  size={24}
                  color="white"
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="pulse"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="view"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="initiatives"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
      </Tabs>

      {Platform.OS === "ios" ? (
        <Animated.View
          style={[styles.blurOverlay, animatedBlurStyle]}
          pointerEvents={pointerEvents}
        >
          <Pressable style={styles.blurPressable} onPress={handleMenuItemPress}>
            <BlurView intensity={80} tint="dark" style={styles.blurView}>
              <View style={styles.blurContent}>
                {/* You can add content here - menu items, options, etc. */}
              </View>
            </BlurView>
          </Pressable>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100, // Lower than tab bar's z-index (1000)
  },
  blurPressable: {
    flex: 1,
  },
  blurView: {
    flex: 1,
  },
  blurContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
