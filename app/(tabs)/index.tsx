import { FavoriteItem, TeamItem } from "@/typings";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const USERNAME: string = `rit3zh`;
const VIEW_WRAPPER_MARGIN_LEFT: number = 20;
const VIEW_WRAPPER_MARGIN_TOP: number = 20;
const GAP: number = 8;

export default function Index() {
  const [fontLoaded] = useFonts({
    SatoshiRegular: require("@/assets/fonts/Satoshi-Regular.otf"),
    SatoshiMedium: require("@/assets/fonts/Satoshi-Medium.otf"),
    SatoshiBold: require("@/assets/fonts/Satoshi-Bold.otf"),
  });

  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "1",
      title: "Code Review: Product Search & Filter",
      checked: true,
      icon: null,
    },
    {
      id: "2",
      title: "Research: Abandoned Cart Recovery",
      checked: false,
      icon: "loading",
    },
    {
      id: "3",
      title: "Product Review and Rating",
      checked: false,
      icon: "clock",
    },
  ]);

  const TEAMS: TeamItem[] = [{ id: "1", name: "Github" }] as TeamItem[];

  const toggleCheckbox: <T extends string>(id: T) => void = <T extends string>(
    id: T
  ): void =>
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );

  const renderCheckbox: <T extends boolean>(
    checked: T
  ) => React.JSX.Element & React.ReactNode & React.ReactElement = <
    T extends boolean
  >(
    checked: T
  ): React.JSX.Element & React.ReactNode & React.ReactElement => {
    return (
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark-sharp" size={10} color="#fff" />}
      </View>
    );
  };

  const renderItemIcon = <T extends FavoriteItem["icon"]>(
    icon: T
  ): React.JSX.Element | null => {
    if (icon === "loading") {
      return <ActivityIndicator size="small" color="#888" />;
    }
    if (icon === "clock") {
      return (
        <View style={styles.clockIconWrapper}>
          <Ionicons name="time-outline" size={18} color="#FFA500" />
        </View>
      );
    }
    return null;
  };

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
              {USERNAME}
            </Text>
            <Text
              style={[
                styles.home,
                {
                  fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                },
              ]}
            >
              Home
            </Text>
            <View style={styles.rowView}>
              <MaterialIcons
                name="filter-center-focus"
                size={24}
                color="#fff"
              />
              <Text
                style={[
                  styles.rowLabel,
                  {
                    fontFamily: fontLoaded ? "SatoshiRegular" : undefined,
                  },
                ]}
              >
                My Issues
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <Text
              style={[
                styles.contentViewSectionLabel,
                {
                  fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                },
              ]}
            >
              Favorites
            </Text>
            <View style={styles.favoritesList}>
              {favorites.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.favoriteItem}
                  onPress={() => toggleCheckbox(item.id)}
                  activeOpacity={0.7}
                >
                  {renderCheckbox(item.checked)}
                  <Text
                    style={[
                      styles.favoriteItemText,
                      {
                        fontFamily: fontLoaded ? "SatoshiRegular" : undefined,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  {renderItemIcon(item.icon)}
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={[
                styles.contentViewSectionLabel,
                styles.teamsSection,
                {
                  fontFamily: fontLoaded ? "SatoshiBold" : undefined,
                },
              ]}
            >
              Teams
            </Text>
            <View style={styles.teamsList}>
              {TEAMS.map((team: TeamItem) => (
                <TouchableOpacity
                  key={team.id}
                  style={styles.teamItem}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="logo-github"
                    size={15}
                    color="#EEFFEF"
                    style={{
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={[
                      styles.teamItemText,
                      {
                        fontFamily: fontLoaded ? "SatoshiMedium" : undefined,
                      },
                    ]}
                  >
                    {team.name}
                  </Text>
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
  rowView: {
    flexDirection: "row",
    gap: GAP,
    alignItems: "center",
  },
  rowLabel: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  contentView: {
    marginTop: 10,
  },
  contentViewSectionLabel: {
    color: "#BABABA",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  teamsSection: {
    marginTop: 35,
  },
  favoritesList: {
    gap: 12,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#767676",
    borderRadius: 96,
    marginRight: 12,
    borderStyle: "dotted",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#5B6FE6",
    borderColor: "#5B6FE6",
  },
  favoriteItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  clockIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  teamsList: {
    gap: 12,
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  teamIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#1A3A1A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  teamItemText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
  },
});
