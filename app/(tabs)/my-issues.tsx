import { Feather, Ionicons } from "@expo/vector-icons";
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

export default function MyIssuesScreen() {
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
            ></Text>
            <Text
              style={[
                styles.home,
                {
                  fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                },
              ]}
            >
              My Issues
            </Text>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.tabActive}>
              <Text
                style={[
                  styles.tabTextActive,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Assigned
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Created
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Subscribed
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Todo
              </Text>
              <TouchableOpacity>
                <Ionicons name="add" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.issueItem}>
              <View style={styles.issueIcons}>
                <Feather name="bar-chart" size={16} color="#FFFFFF" />

                <View style={styles.statusCircle} />
              </View>
              <Text
                style={[
                  styles.issueText,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                UI
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Backlog
              </Text>
              <TouchableOpacity>
                <Ionicons name="add" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.issueItem}>
              <View style={styles.issueIcons}>
                <Feather name="bar-chart" size={16} color="#FFFFFF" />
                <View style={styles.loadingSpinner}>
                  <View style={styles.spinnerDot} />
                </View>
              </View>
              <Text
                style={[
                  styles.issueText,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                UI Rework
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.issueItem}>
              <View style={styles.issueIcons}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={16}
                  color="#666666"
                />
                <View style={styles.loadingSpinner}>
                  <View style={styles.spinnerDot} />
                </View>
              </View>
              <Text
                style={[
                  styles.issueText,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
                numberOfLines={1}
              >
                Make more amazing animations using (Expo)...
              </Text>
            </TouchableOpacity>
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
  tabsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    marginBottom: 30,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  tabActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  tabText: {
    color: "#888888",
    fontSize: 15,
  },
  tabTextActive: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#666666",
    fontSize: 15,
  },
  issueItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  issueIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  loadingSpinner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#BBBBBB",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderStyle: "dotted",
  },
  spinnerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderStyle: "dotted",
    position: "absolute",
    top: 1,
  },
  issueText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
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
  },
  notificationDescription: {
    color: "#888888",
    fontSize: 14,
    lineHeight: 20,
  },
});
