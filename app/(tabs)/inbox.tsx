import { WIDTH } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VIEW_WRAPPER_MARGIN_LEFT: number = 20;
const VIEW_WRAPPER_MARGIN_TOP: number = 20;

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  avatar: string;
  avatarColor: string;
  icon: "chatbubble" | "at" | "rocket" | "flash";
}

export default function InboxScreen() {
  const [fontLoaded] = useFonts({
    SatoshiRegular: require("@/assets/fonts/Satoshi-Regular.otf"),
    SatoshiMedium: require("@/assets/fonts/Satoshi-Medium.otf"),
    SatoshiBold: require("@/assets/fonts/Satoshi-Bold.otf"),
  });

  const renderAvatarIcon = (iconName: NotificationItem["icon"]) => {
    const iconMap = {
      chatbubble: "chatbubble",
      at: "at",
      rocket: "rocket",
      flash: "flash",
    };

    return (
      <View style={styles.avatarIconWrapper}>
        <Ionicons name={iconMap[iconName] as any} size={12} color="#FFFFFF" />
      </View>
    );
  };

  const [notifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Feature Launch",
      description:
        "Sarah Martinez commented: [image: screenshot.png] Looking great! Ready to deploy? · 2 hrs ago",
      time: "2 hrs ago",
      avatar: "SM",
      avatarColor: "#4A90E2",
      icon: "chatbubble",
    },
    {
      id: "2",
      title: "Design System",
      description: "Added as a collaborator by Marcus Chen · 5 hrs ago",
      time: "5 hrs ago",
      avatar: "MC",
      avatarColor: "#5B6FE6",
      icon: "at",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Assigned by Jordan Lee · 2 days ago",
      time: "2 days ago",
      avatar: "JL",
      avatarColor: "#7B68EE",
      icon: "rocket",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.viewWrapper}>
          <View style={styles.header}>
            <Text
              style={[
                styles.username,
                {
                  fontFamily: fontLoaded ? "SatoshiMedium" : undefined,
                },
              ]}
            >
              {/*  */}
            </Text>
            <Text
              style={[
                styles.home,
                {
                  fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                },
              ]}
            >
              Inbox
            </Text>
            <View style={styles.notificationsList}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={styles.notificationItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.avatarContainer}>
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: notification.avatarColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.avatarText,
                          {
                            fontFamily: fontLoaded
                              ? "SatoshiMedium"
                              : undefined,
                          },
                        ]}
                      >
                        {notification.avatar}
                      </Text>
                    </View>
                    {renderAvatarIcon(notification.icon)}
                  </View>

                  <View style={styles.notificationContent}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        {
                          fontFamily: fontLoaded ? "SatoshiMedium" : undefined,
                        },
                      ]}
                    >
                      {notification.title}
                    </Text>
                    <Text
                      style={[
                        styles.notificationDescription,
                        {
                          fontFamily: fontLoaded ? "SatoshiRegular" : undefined,
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {notification.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(24 24 24 / 0.99)",
  },
  viewWrapper: {
    marginLeft: VIEW_WRAPPER_MARGIN_LEFT,
    marginTop: VIEW_WRAPPER_MARGIN_TOP,
    marginRight: VIEW_WRAPPER_MARGIN_LEFT,
    paddingBottom: 40,
  },
  header: {
    gap: 20,
  },
  username: {
    color: "#CFCFCF",
    fontSize: 14,
  },
  home: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 32,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationsList: {
    gap: 24,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  avatarIconWrapper: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1C1C1C",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(24, 24, 24, 0.99)",
  },
  notificationContent: {
    flex: 1,
    paddingTop: 2,
  },
  notificationTitle: {
    color: "#E0E0E0",
    fontSize: 16,
    marginBottom: 4,
    maxWidth: "90%",
  },
  notificationDescription: {
    color: "#888888",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: WIDTH - VIEW_WRAPPER_MARGIN_LEFT * 2 - 72 - 12,
  },
});
