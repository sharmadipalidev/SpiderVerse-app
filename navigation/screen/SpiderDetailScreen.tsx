import React from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/AppThemeContext";
import ThemeToggleButton from "../../components/theme-toggle-button";
import type { AVPlaybackStatus } from "expo-av";

type ExpoAVModule = typeof import("expo-av");

let expoAV: ExpoAVModule | null = null;

try {
  expoAV = require("expo-av");
} catch {
  expoAV = null;
}

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
  const styles = createStyles(theme);
  const soundRef = React.useRef<any>(null);
  const [activeSongIndex, setActiveSongIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [durationMillis, setDurationMillis] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const activeSong = SPIDER_SONGS[activeSongIndex];
  const hasAudio = Boolean(expoAV?.Audio);

  const unloadSound = React.useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  }, []);

  const loadSong = React.useCallback(
    async (index: number, shouldPlay: boolean) => {
      if (!expoAV?.Audio) {
        setActiveSongIndex(index);
        setIsPlaying(false);
        setCurrentTime(0);
        return;
      }

      setIsLoading(true);
      setActiveSongIndex(index);
      setCurrentTime(0);

      try {
        await unloadSound();
        const { sound, status } = await expoAV.Audio.Sound.createAsync(
          SPIDER_SONGS[index].source,
          { shouldPlay, progressUpdateIntervalMillis: 500 }
        );

        sound.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) => {
          if (!playbackStatus.isLoaded) {
            return;
          }

          setIsPlaying(playbackStatus.isPlaying);
          setCurrentTime(playbackStatus.positionMillis ?? 0);
          setDurationMillis(playbackStatus.durationMillis ?? 1);

          if (playbackStatus.didJustFinish) {
            const nextIndex = (index + 1) % SPIDER_SONGS.length;
            void loadSong(nextIndex, true);
          }
        });

        soundRef.current = sound;

        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          setCurrentTime(status.positionMillis ?? 0);
          setDurationMillis(status.durationMillis ?? 1);
        }
      } catch (error) {
        console.error("Failed to load local track", error);
      } finally {
        setIsLoading(false);
      }
    },
    [unloadSound]
  );

  React.useEffect(() => {
    if (!expoAV?.Audio) {
      return;
    }

    void expoAV.Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
    void loadSong(0, false);

    return () => {
      void unloadSound();
    };
  }, [loadSong, unloadSound]);

  const selectSong = async (index: number) => {
    await loadSong(index, true);
  };

  const goToPreviousSong = async () => {
    const nextIndex =
      (activeSongIndex - 1 + SPIDER_SONGS.length) % SPIDER_SONGS.length;
    await loadSong(nextIndex, true);
  };

  const goToNextSong = async () => {
    const nextIndex = (activeSongIndex + 1) % SPIDER_SONGS.length;
    await loadSong(nextIndex, true);
  };

  const togglePlayback = async () => {
    if (!soundRef.current) {
      await loadSong(activeSongIndex, true);
      return;
    }

    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const progressPercent = durationMillis > 0 ? (currentTime / durationMillis) * 100 : 0;

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
                  <Text style={styles.eyebrow}>Spider-Man Soundtrack</Text>
                  <Text style={styles.title}>Songs</Text>
                  <Text style={styles.description}>
                    Local Spider-Man tracks with looping playback and cleaner
                    cards for light and dark mode.
                  </Text>
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
                    styles.playerAccent,
                    { backgroundColor: activeSong.accent },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="music-clef-treble"
                    size={26}
                    color="#ffffff"
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
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
              </View>

              {!hasAudio ? (
                <Text style={styles.warningText}>
                  Audio module is not ready yet. Restart Expo after installing
                  native packages.
                </Text>
              ) : null}

              <View style={styles.controlsRow}>
                <Pressable
                  style={styles.iconControl}
                  onPress={() => void goToPreviousSong()}
                >
                  <Ionicons
                    name="play-skip-back"
                    size={22}
                    color={theme.mode === "dark" ? "#f7f1ff" : "#20163a"}
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.playControl,
                    { backgroundColor: activeSong.accent },
                  ]}
                  onPress={() => void togglePlayback()}
                >
                  {isLoading ? (
                    <MaterialCommunityIcons
                      name="loading"
                      size={24}
                      color="#ffffff"
                    />
                  ) : (
                    <Ionicons
                      name={isPlaying ? "pause" : "play"}
                      size={24}
                      color="#ffffff"
                    />
                  )}
                </Pressable>
                <Pressable
                  style={styles.iconControl}
                  onPress={() => void goToNextSong()}
                >
                  <Ionicons
                    name="play-skip-forward"
                    size={22}
                    color={theme.mode === "dark" ? "#f7f1ff" : "#20163a"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <Pressable
            style={[
              styles.songCard,
              {
                backgroundColor: item.accentSoft,
                borderColor: item.accent,
                opacity: activeSongIndex === index ? 1 : 0.95,
              },
            ]}
            onPress={() => void selectSong(index)}
          >
            <View style={styles.songTopRow}>
              <View
                style={[
                  styles.songNumberBadge,
                  { backgroundColor: item.accent },
                ]}
              >
                <Text style={styles.songNumberText}>
                  {String(index + 1).padStart(2, "0")}
                </Text>
              </View>
              <View style={styles.songMeta}>
                <Text style={styles.songState}>
                  {activeSongIndex === index
                    ? isPlaying
                      ? "Playing now"
                      : "Loaded"
                    : "Tap to play"}
                </Text>
                <Text style={styles.songMovie}>{item.movie}</Text>
              </View>
            </View>

            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>

            <View style={styles.songBottomRow}>
              <View style={styles.moodPill}>
                <MaterialCommunityIcons
                  name="music-note-eighth"
                  size={14}
                  color={theme.mode === "dark" ? "#f7f1ff" : "#20163a"}
                />
                <Text style={styles.moodText}>{item.mood}</Text>
              </View>
              <Text style={styles.songYear}>{item.year}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default SongsScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.mode === "dark" ? "#140f22" : "#f8eef8",
    },
    listContent: {
      padding: 18,
      paddingBottom: 28,
      gap: 14,
    },
    headerWrap: {
      marginBottom: 18,
    },
    banner: {
      backgroundColor: theme.mode === "dark" ? "#211735" : "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#8467a0" : "#74528e",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 12,
    },
    textWrap: {
      flex: 1,
    },
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
      fontSize: 30,
      fontWeight: "900",
      marginBottom: 10,
    },
    description: {
      color: "#efe7ff",
      fontSize: 14,
      lineHeight: 21,
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
      marginTop: 16,
      borderRadius: 24,
      padding: 18,
      backgroundColor: theme.mode === "dark" ? "#1e1729" : "#fff8fd",
      borderWidth: 1,
      borderColor: theme.mode === "dark" ? "#4c3a5d" : "#dca4ca",
    },
    playerTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
    },
    playerTextWrap: {
      flex: 1,
    },
    playerLabel: {
      color: "#ff73b9",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 6,
    },
    playerTitle: {
      color: theme.mode === "dark" ? "#f7f1ff" : "#20163a",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 4,
    },
    playerArtist: {
      color: theme.mode === "dark" ? "#d4c8e8" : "#69597a",
      fontSize: 14,
      lineHeight: 20,
    },
    playerAccent: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
    },
    progressTrack: {
      height: 8,
      borderRadius: 999,
      backgroundColor: theme.mode === "dark" ? "#3a2b49" : "#eddceb",
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
      marginBottom: 16,
    },
    timeText: {
      color: theme.mode === "dark" ? "#d4c8e8" : "#6f627e",
      fontSize: 12,
      fontWeight: "700",
    },
    warningText: {
      color: theme.mode === "dark" ? "#d4c8e8" : "#6f627e",
      fontSize: 12,
      textAlign: "center",
      marginBottom: 16,
    },
    controlsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    iconControl: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: theme.mode === "dark" ? "#342744" : "#efe3f7",
      alignItems: "center",
      justifyContent: "center",
    },
    playControl: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
    },
    songCard: {
      borderRadius: 24,
      padding: 18,
      borderWidth: 1,
      shadowColor: "#20163a",
      shadowOpacity: theme.mode === "dark" ? 0 : 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    songTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
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
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "900",
    },
    songMeta: {
      flex: 1,
      alignItems: "flex-end",
    },
    songState: {
      color: theme.mode === "dark" ? "#f7f1ff" : "#20163a",
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      marginBottom: 4,
    },
    songMovie: {
      color: theme.mode === "dark" ? "#ddd3ef" : "#20163a",
      fontSize: 12,
      fontWeight: "800",
      textAlign: "right",
    },
    songYear: {
      color: theme.mode === "dark" ? "#d4c8e8" : "#6f627e",
      fontSize: 12,
      marginTop: 4,
    },
    songTitle: {
      color: theme.mode === "dark" ? "#f7f1ff" : "#20163a",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 6,
    },
    songArtist: {
      color: theme.mode === "dark" ? "#d4c8e8" : "#584b68",
      fontSize: 15,
      lineHeight: 21,
      marginBottom: 16,
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
      gap: 8,
      backgroundColor:
        theme.mode === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.72)",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    moodText: {
      color: theme.mode === "dark" ? "#f7f1ff" : "#20163a",
      fontSize: 13,
      fontWeight: "700",
    },
  });

const formatTime = (timeInMillis: number) => {
  const totalSeconds = Math.floor(timeInMillis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
