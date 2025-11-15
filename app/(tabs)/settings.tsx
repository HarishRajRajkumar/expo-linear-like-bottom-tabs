import { Feather, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const isIOS = Platform.OS === "ios";

const VIEW_WRAPPER_MARGIN_LEFT: number = 20;
const VIEW_WRAPPER_MARGIN_TOP: number = 20;

export default function SettingsScreen() {
  const [fontLoaded] = useFonts({
    SatoshiRegular: require("@/assets/fonts/Satoshi-Regular.otf"),
    SatoshiMedium: require("@/assets/fonts/Satoshi-Medium.otf"),
    SatoshiBold: require("@/assets/fonts/Satoshi-Bold.otf"),
  });

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
            <View style={styles.headerRow}>
              <Text
                style={[
                  styles.home,
                  {
                    fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                  },
                ]}
              >
                Settings
              </Text>
            </View>
          </View>

          <View style={styles.settingsMenu}>
            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Workspace
              </Text>
              <View style={styles.settingRight}>
                <Text
                  style={[
                    styles.settingValue,
                    { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                  ]}
                >
                  rit3zh's
                </Text>
                <Ionicons name="chevron-expand" size={16} color="#888888" />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Notifications
              </Text>
              <View style={styles.settingRight}>
                <Text
                  style={[
                    styles.settingValue,
                    { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                  ]}
                >
                  Custom schedule
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#888888" />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Display
              </Text>
              <View style={styles.settingRight}>
                <Text
                  style={[
                    styles.settingValue,
                    { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                  ]}
                >
                  Dark
                </Text>
                <Ionicons name="chevron-expand" size={16} color="#888888" />
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Rate Linear
              </Text>
              <Feather name="arrow-up-right" size={16} color="#888888" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Send feedback
              </Text>
              <Feather name="arrow-up-right" size={16} color="#888888" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Support
              </Text>
              <Feather name="arrow-up-right" size={16} color="#888888" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabel,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Privacy
              </Text>
              <Feather name="arrow-up-right" size={16} color="#888888" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text
                style={[
                  styles.settingLabelDanger,
                  { fontFamily: fontLoaded ? "SatoshiMedium" : undefined },
                ]}
              >
                Log out
              </Text>
              <Ionicons name="log-out-outline" size={16} color="#FF4444" />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.versionText,
              { fontFamily: fontLoaded ? "SatoshiRegular" : undefined },
            ]}
          >
            {isIOS
              ? "Linear for iOS 1.50.0 (9261)"
              : "Linear for Android 1.50.0 (9261)"}
          </Text>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  home: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  composeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsMenu: {
    marginTop: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },
  settingLabel: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  settingLabelDanger: {
    color: "#FF4444",
    fontSize: 17,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    color: "#CCCCCC",
    fontSize: 17,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(58 58 58 / 0.1)",
  },
  versionText: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 60,
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
