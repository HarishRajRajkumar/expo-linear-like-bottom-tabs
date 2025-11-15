import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const IMAGES: string[] = [
  "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://i.pinimg.com/736x/a3/42/a5/a342a5261e23a03fdfa88be4c793e27e.jpg",
  "https://images.pexels.com/photos/4921131/pexels-photo-4921131.jpeg?cs=srgb&dl=pexels-cottonbro-4921131.jpg&fm=jpg",
  "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const SIZE: number = 60;
const STAGGER_DELAY: number = 0; // milliseconds between each image

export default function Index() {
  const animations = IMAGES.map(() => useSharedValue<number>(0));

  const onPress = async (): Promise<void> => {
    if (animations[0].value === 0) {
      // Animate - clap effect (outer images move first, inner images last)
      animations.forEach((anim, index) => {
        let delay: number;
        if (index < 2) {
          // Left side: 0 gets 0ms, 1 gets 100ms
          delay = index * STAGGER_DELAY;
        } else {
          // Right side: 3 gets 0ms, 2 gets 100ms
          delay = (3 - index) * STAGGER_DELAY;
        }

        anim.value = withDelay(
          delay,
          withTiming(1, {
            duration: 800,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease
          })
        );
      });
    } else {
      // Animate back - reverse clap (inner images move first, outer images last)
      animations.forEach((anim, index) => {
        let delay: number;
        if (index < 2) {
          // Left side: 1 gets 0ms, 0 gets 100ms
          delay = (1 - index) * STAGGER_DELAY;
        } else {
          // Right side: 2 gets 0ms, 3 gets 100ms
          delay = (index - 2) * STAGGER_DELAY;
        }

        anim.value = withDelay(
          delay,
          withTiming(0, {
            duration: 800,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          })
        );
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageViewContainer}>
        {IMAGES.map((uri: string, index: number) => {
          const isLeftSide = index < 2;
          return (
            <AnimatedImage
              key={uri}
              uri={uri}
              index={index}
              animation={animations[index]}
              isLeftSide={isLeftSide}
            />
          );
        })}
      </View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Animate</Text>
      </Pressable>
    </SafeAreaView>
  );
}

interface AnimatedImageProps {
  uri: string;
  index: number;
  animation: SharedValue<number>;
  isLeftSide: boolean;
}

function AnimatedImage({
  uri,
  index,
  animation,
  isLeftSide,
}: AnimatedImageProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // Move towards center horizontally
    const translateX = isLeftSide
      ? animation.value * 150 // Left images move RIGHT (towards center)
      : animation.value * -150; // Right images move LEFT (towards center)

    // Move upwards
    const translateY = animation.value * -200; // Move up 200 pixels

    // Fade out
    const opacity = 1 - animation.value;

    // Scale down to 0
    const scale = 1 - animation.value; // Goes from 1 to 0

    return {
      transform: [{ translateX }, { translateY }, { scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={{
          uri,
        }}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 40,
  },
  image: {
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
  },
  imageViewContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
