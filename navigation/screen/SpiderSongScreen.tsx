import React from "react";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";
import { useAppTheme } from "../../theme/AppThemeContext";
import ThemeToggleButton from "../../components/theme-toggle-button";

type SpiderSong = {
  id: string;
  title: string;
  artist: string;
  movie: string;
  year: string;
  mood: string;
  source: any;
  accent: string;
  accentSoft: string;
};

const SPIDER_SONGS: SpiderSong[] = [
  {
    id: "1",
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    movie: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    mood: "Warm, floating, iconic",
    source: require("../../assets/audio/sunflower.m4a"),
    accent: "#ff73b9",
    accentSoft: "#ffe2f1",
  },
  {
    id: "2",
    title: "Mona Lisa",
    artist: "Dominic Fike",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Sleek, moody, stylish",
    source: require("../../assets/audio/mona-lisa.m4a"),
    accent: "#63d9ff",
    accentSoft: "#def7ff",
  },
  {
    id: "3",
    title: "Am I Dreaming",
    artist: "Metro Boomin, A$AP Rocky & Roisee",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Cinematic, emotional, nocturnal",
    source: require("../../assets/audio/am-i-dreaming.m4a"),
    accent: "#9b7bff",
    accentSoft: "#ece6ff",
  },
  {
    id: "4",
    title: "Calling",
    artist: "Metro Boomin, Swae Lee & NAV",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Dreamy, melodic, late-night",
    source: require("../../assets/audio/calling.m4a"),
    accent: "#7a5cff",
    accentSoft: "#e7e1ff",
  },
  {
    id: "5",
    title: "Self Love",
    artist: "Metro Boomin & Coi Leray",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Bright, confident, Gwen-coded",
    source: require("../../assets/audio/self-love.m4a"),
    accent: "#ff5f8f",
    accentSoft: "#ffdfe8",
  },
];

const SongsScreen = () => {
  const { theme } = useAppTheme();
  const isDark = theme.mode === "dark";
  const styles = createStyles(theme);

  const [activeSongIndex, setActiveSongIndex] = React.useState(0);
  const autoPlayRef = React.useRef(false);
  const activeSong = SPIDER_SONGS[activeSongIndex];

  const player = useAudioPlayer(activeSong.source, 500);
  const status = useAudioPlayerStatus(player);

  React.useEffect(() => {
    void setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldPlayInBackground: false,
    });
  }, []);

  React.useEffect(() => {
    if (autoPlayRef.current) {
      player.play();
      autoPlayRef.current = false;
    }
    return () => {
      player.remove();
    };
  }, [player]);

  React.useEffect(() => {
    if (status.didJustFinish) {
      autoPlayRef.current = true;
      setActiveSongIndex((prev) => (prev + 1) % SPIDER_SONGS.length);
    }
  }, [status.didJustFinish]);

  const selectSong = (index: number) => {
    if (index === activeSongIndex) {
      status.playing ? player.pause() : player.play();
      return;
    }
    autoPlayRef.current = true;
    setActiveSongIndex(index);
  };

  const goToPreviousSong = () => {
    autoPlayRef.current = true;
    setActiveSongIndex(
      (prev) => (prev - 1 + SPIDER_SONGS.length) % SPIDER_SONGS.length,
    );
  };

  const goToNextSong = () => {
    autoPlayRef.current = true;
    setActiveSongIndex((prev) => (prev + 1) % SPIDER_SONGS.length);
  };

  const togglePlayback = () => {
    status.playing ? player.pause() : player.play();
  };

  const seekBackward5 = () => {
    const target = Math.max(0, (status.currentTime ?? 0) - 5);
    player.seekTo(target);
  };

  const seekForward5 = () => {
    const duration = status.duration ?? 0;
    const target = Math.min(duration, (status.currentTime ?? 0) + 5);
    player.seekTo(target);
  };

  const currentTimeSec = status.currentTime ?? 0;
  const durationSec = status.duration ?? 0;
  const progressPercent =
    durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0;
  const isLoading = !status.isLoaded || status.isBuffering;

  const iconColor = isDark ? "#e0d4ff" : "#20163a";

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={SPIDER_SONGS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <View style={styles.banner}>
              <View style={styles.topRow}>
                <View style={styles.textWrap}>
                  <Text style={styles.eyebrow}>Spider-Man Sountracks</Text>
                  <Text style={styles.title}>Songs</Text>
                </View>
                <ThemeToggleButton iconVariant="gwen-theme" />
              </View>

              <View style={styles.highlightRow}>
                <View style={styles.highlightChip}>
                  <Feather name="music" size={14} color="#20163a" />
                  <Text style={styles.highlightText}>Local audio</Text>
                </View>
                <View style={styles.highlightChip}>
                  <MaterialCommunityIcons
                    name="movie-open"
                    size={15}
                    color="#20163a"
                  />
                  <Text style={styles.highlightText}>Playlist loop</Text>
                </View>
              </View>
            </View>

            <View style={styles.playerCard}>
              <View style={styles.playerTopRow}>
                <View style={styles.playerTextWrap}>
                  <Text style={styles.playerLabel}>Now Playing</Text>
                  <Text style={styles.playerTitle}>{activeSong.title}</Text>
                  <Text style={styles.playerArtist}>{activeSong.artist}</Text>
                </View>
                <View
                  style={[
                    styles.playerAccentBadge,
                    {
                      backgroundColor: isDark
                        ? activeSong.accent + "2e"
                        : activeSong.accent + "22",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="music-clef-treble"
                    size={26}
                    color={activeSong.accent}
                  />
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercent}%` as const,
                      backgroundColor: activeSong.accent,
                    },
                  ]}
                />
              </View>

              <View style={styles.timeRow}>
                <Text style={styles.timeText}>
                  {formatTime(currentTimeSec)}
                </Text>
                <Text style={styles.timeText}>{formatTime(durationSec)}</Text>
              </View>

              <View style={styles.controlsRow}>
                <Pressable
                  style={styles.iconControl}
                  onPress={goToPreviousSong}
                >
                  <Ionicons name="play-skip-back" size={20} color={iconColor} />
                </Pressable>

                <Pressable style={styles.iconControl} onPress={seekBackward5}>
                  <MaterialIcons name="replay-5" size={26} color={iconColor} />
                </Pressable>

                <Pressable
                  style={[
                    styles.playControl,
                    { backgroundColor: activeSong.accent },
                  ]}
                  onPress={togglePlayback}
                >
                  {isLoading ? (
                    <MaterialCommunityIcons
                      name="loading"
                      size={24}
                      color="#fff"
                    />
                  ) : (
                    <Ionicons
                      name={status.playing ? "pause" : "play"}
                      size={24}
                      color="#fff"
                    />
                  )}
                </Pressable>

                <Pressable style={styles.iconControl} onPress={seekForward5}>
                  <MaterialIcons name="forward-5" size={26} color={iconColor} />
                </Pressable>

                <Pressable style={styles.iconControl} onPress={goToNextSong}>
                  <Ionicons
                    name="play-skip-forward"
                    size={20}
                    color={iconColor}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => {
          const isActive = activeSongIndex === index;

          const cardBg = isDark
            ? isActive
              ? item.accent + "28"
              : item.accent + "12"
            : item.accentSoft;

          const cardBorder = isDark
            ? isActive
              ? item.accent + "bb"
              : item.accent + "3a"
            : isActive
              ? item.accent
              : item.accent + "77";

          const badgeBg = isDark ? item.accent + "30" : item.accent;
          const badgeTextColor = isDark ? item.accent : "#ffffff";

          const stateLabelColor = isActive
            ? item.accent
            : isDark
              ? "#7a6d96"
              : "#8a7a9a";

          const secondaryColor = isDark ? "#bbaed8" : "#584b68";
          const movieColor = isDark ? "#d8ccee" : "#4a3d5c";
          const moodBg = isDark ? item.accent + "20" : "rgba(255,255,255,0.72)";
          const moodTextColor = isDark ? item.accent : "#20163a";

          return (
            <Pressable
              style={[
                styles.songCard,
                {
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  shadowOpacity: isDark ? 0 : isActive ? 0.13 : 0.06,
                },
              ]}
              onPress={() => selectSong(index)}
            >
              <View style={styles.songTopRow}>
                <View
                  style={[styles.songNumberBadge, { backgroundColor: badgeBg }]}
                >
                  <Text
                    style={[styles.songNumberText, { color: badgeTextColor }]}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>

                <View style={styles.songMeta}>
                  <Text style={[styles.songState, { color: stateLabelColor }]}>
                    {isActive
                      ? status.playing
                        ? "▶ Playing now"
                        : "⏸ Paused"
                      : "Tap to play"}
                  </Text>
                  <Text style={[styles.songMovie, { color: movieColor }]}>
                    {item.movie}
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.songTitle,
                  { color: isDark ? "#f0eaff" : "#20163a" },
                ]}
              >
                {item.title}
              </Text>
              <Text style={[styles.songArtist, { color: secondaryColor }]}>
                {item.artist}
              </Text>

              <View style={styles.songBottomRow}>
                <View style={[styles.moodPill, { backgroundColor: moodBg }]}>
                  <MaterialCommunityIcons
                    name="music-note-eighth"
                    size={14}
                    color={moodTextColor}
                  />
                  <Text style={[styles.moodText, { color: moodTextColor }]}>
                    {item.mood}
                  </Text>
                </View>
                <Text style={[styles.songYear, { color: secondaryColor }]}>
                  {item.year}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SongsScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) => {
  const isDark = theme.mode === "dark";

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#0e0a1a" : "#f4edf8",
    },
    listContent: {
      padding: 20,
      paddingBottom: 36,
      gap: 12,
    },
    headerWrap: { marginBottom: 18 },

    banner: {
      backgroundColor: isDark ? "#1a1030" : "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: isDark ? "#6a4e8a" : "#5e3f78",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12,
    },
    textWrap: { flex: 1 },
    eyebrow: {
      color: "#ff73b9",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.1,
      marginBottom: 8,
    },
    title: {
      color: "#ffffff",
      fontSize: 25,
      fontWeight: "900",
      marginBottom: 4,
    },
    highlightRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 18,
      flexWrap: "wrap",
    },
    highlightChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#63d9ff",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    highlightText: {
      color: "#20163a",
      fontSize: 13,
      fontWeight: "800",
    },

    playerCard: {
      marginTop: 14,
      borderRadius: 24,
      padding: 20,
      backgroundColor: isDark ? "#17112a" : "#ffffff",
      borderWidth: 1,
      borderColor: isDark ? "#3d2d56" : "#e0c8e8",
      shadowColor: "#20163a",
      shadowOpacity: isDark ? 0 : 0.1,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 6 },
      elevation: isDark ? 0 : 4,
    },
    playerTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginBottom: 18,
    },
    playerTextWrap: { flex: 1 },
    playerLabel: {
      color: "#ff73b9",
      fontSize: 11,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 6,
    },
    playerTitle: {
      color: isDark ? "#f0eaff" : "#20163a",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 4,
    },
    playerArtist: {
      color: isDark ? "#b8aad8" : "#69597a",
      fontSize: 14,
      lineHeight: 20,
    },
    playerAccentBadge: {
      width: 54,
      height: 54,
      borderRadius: 27,
      alignItems: "center",
      justifyContent: "center",
    },

    progressTrack: {
      height: 6,
      borderRadius: 999,
      backgroundColor: isDark ? "#2e2042" : "#eddceb",
      overflow: "hidden",
      marginBottom: 10,
    },
    progressFill: {
      height: "100%",
      borderRadius: 999,
    },
    timeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 18,
    },
    timeText: {
      color: isDark ? "#9e8fbe" : "#8a7898",
      fontSize: 12,
      fontWeight: "700",
    },

    controlsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    iconControl: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? "#251c3a" : "#f0e6f8",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: isDark ? "#3d2d56" : "#dccde8",
    },

    playControl: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },

    songCard: {
      borderRadius: 22,
      padding: 18,
      borderWidth: 1.5,
      shadowColor: "#20163a",
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    songTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      gap: 12,
    },
    songNumberBadge: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    songNumberText: {
      fontSize: 14,
      fontWeight: "900",
    },
    songMeta: {
      flex: 1,
      alignItems: "flex-end",
    },
    songState: {
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    songMovie: {
      fontSize: 12,
      fontWeight: "700",
      textAlign: "right",
      lineHeight: 16,
    },
    songTitle: {
      fontSize: 22,
      fontWeight: "900",
      marginBottom: 5,
    },
    songArtist: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 14,
    },
    songBottomRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    moodPill: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },
    moodText: {
      fontSize: 13,
      fontWeight: "700",
    },
    songYear: { fontSize: 12 },
  });
};

const formatTime = (timeInSeconds: number) => {
  const totalSeconds = Math.floor(timeInSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
