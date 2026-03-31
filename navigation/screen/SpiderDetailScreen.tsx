import React from "react";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";

type SpiderSong = {
  id: string;
  title: string;
  artist: string;
  movie: string;
  year: string;
  mood: string;
  duration: number;
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
    duration: 158,
    accent: "#ff73b9",
    accentSoft: "#ffe2f1",
  },
  {
    id: "2",
    title: "What's Up Danger",
    artist: "Blackway & Black Caviar",
    movie: "Spider-Man: Into the Spider-Verse",
    year: "2018",
    mood: "Fearless, electric, heroic",
    duration: 221,
    accent: "#63d9ff",
    accentSoft: "#def7ff",
  },
  {
    id: "3",
    title: "Mona Lisa",
    artist: "Dominic Fike",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Sleek, moody, stylish",
    duration: 176,
    accent: "#9b7bff",
    accentSoft: "#ece6ff",
  },
  {
    id: "4",
    title: "Am I Dreaming",
    artist: "Metro Boomin, A$AP Rocky & Roisee",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Cinematic, emotional, nocturnal",
    duration: 196,
    accent: "#7a5cff",
    accentSoft: "#e7e1ff",
  },
  {
    id: "5",
    title: "Annihilate",
    artist: "Metro Boomin, Swae Lee, Lil Wayne & Offset",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Massive, dark, high-energy",
    duration: 230,
    accent: "#ff5f8f",
    accentSoft: "#ffdfe8",
  },
  {
    id: "6",
    title: "Calling",
    artist: "Metro Boomin, Swae Lee & NAV",
    movie: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    mood: "Dreamy, melodic, late-night",
    duration: 232,
    accent: "#59d2d6",
    accentSoft: "#dcf8f6",
  },
];

const SongsScreen = () => {
  const styles = createStyles();
  const [activeSongIndex, setActiveSongIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const activeSong = SPIDER_SONGS[activeSongIndex];

  React.useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime((previousTime) => {
        if (previousTime >= activeSong.duration) {
          const nextIndex = (activeSongIndex + 1) % SPIDER_SONGS.length;
          setActiveSongIndex(nextIndex);
          return 0;
        }

        return previousTime + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSong.duration, activeSongIndex, isPlaying]);

  const selectSong = (index: number) => {
    setActiveSongIndex(index);
    setCurrentTime(0);
  };

  const goToPreviousSong = () => {
    setActiveSongIndex((currentIndex) =>
      currentIndex === 0 ? SPIDER_SONGS.length - 1 : currentIndex - 1
    );
    setCurrentTime(0);
  };

  const goToNextSong = () => {
    setActiveSongIndex((currentIndex) =>
      currentIndex === SPIDER_SONGS.length - 1 ? 0 : currentIndex + 1
    );
    setCurrentTime(0);
  };

  const jumpByFiveSeconds = (amount: number) => {
    setCurrentTime((previousTime) => {
      const nextTime = previousTime + amount;

      if (nextTime < 0) {
        return 0;
      }

      if (nextTime > activeSong.duration) {
        return activeSong.duration;
      }

      return nextTime;
    });
  };

  const progressPercent = (currentTime / activeSong.duration) * 100;

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
                    A curated playlist from Spider-Man movies, styled as local
                    cards with no API data involved.
                  </Text>
                </View>
                <ThemeToggleButton iconVariant="gwen-theme" />
              </View>

              <View style={styles.highlightRow}>
                <View style={styles.highlightChip}>
                  <Feather name="music" size={14} color="#20163a" />
                  <Text style={styles.highlightText}>Spider-Verse vibes</Text>
                </View>
                <View style={styles.highlightChip}>
                  <MaterialCommunityIcons
                    name="movie-open"
                    size={15}
                    color="#20163a"
                  />
                  <Text style={styles.highlightText}>Movie favorites</Text>
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
                <Text style={styles.timeText}>
                  {formatTime(activeSong.duration)}
                </Text>
              </View>

              <View style={styles.controlsRow}>
                <Pressable
                  style={styles.smallControl}
                  onPress={() => jumpByFiveSeconds(-5)}
                >
                  <Text style={styles.smallControlText}>-5s</Text>
                </Pressable>
                <Pressable style={styles.iconControl} onPress={goToPreviousSong}>
                  <Ionicons
                    name="play-skip-back"
                    size={22}
                    color="#20163a"
                  />
                </Pressable>
                <Pressable
                  style={[
                    styles.playControl,
                    { backgroundColor: activeSong.accent },
                  ]}
                  onPress={() => setIsPlaying((current) => !current)}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="#ffffff"
                  />
                </Pressable>
                <Pressable style={styles.iconControl} onPress={goToNextSong}>
                  <Ionicons
                    name="play-skip-forward"
                    size={22}
                    color="#20163a"
                  />
                </Pressable>
                <Pressable
                  style={styles.smallControl}
                  onPress={() => jumpByFiveSeconds(5)}
                >
                  <Text style={styles.smallControlText}>+5s</Text>
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
                opacity: activeSongIndex === index ? 1 : 0.92,
              },
            ]}
            onPress={() => selectSong(index)}
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
                      : "Ready to play"
                    : "Tap to load"}
                </Text>
                <Text style={styles.songMovie}>{item.movie}</Text>
                <Text style={styles.songYear}>{item.year}</Text>
              </View>
            </View>

            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>

            <View style={styles.moodPill}>
              <MaterialCommunityIcons
                name="music-note-eighth"
                size={14}
                color="#20163a"
              />
              <Text style={styles.moodText}>{item.mood}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default SongsScreen;

const createStyles = () =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#f8eef8",
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
      backgroundColor: "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: "#74528e",
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
      backgroundColor: "#fff8fd",
      borderWidth: 1,
      borderColor: "#dca4ca",
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
      color: "#20163a",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 4,
    },
    playerArtist: {
      color: "#69597a",
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
      backgroundColor: "#eddceb",
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
      color: "#6f627e",
      fontSize: 12,
      fontWeight: "700",
    },
    smallControl: {
      minWidth: 54,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: "#efe3f7",
      alignItems: "center",
    },
    smallControlText: {
      color: "#20163a",
      fontSize: 13,
      fontWeight: "800",
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
      backgroundColor: "#efe3f7",
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
      shadowOpacity: 0.08,
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
      color: "#20163a",
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      marginBottom: 4,
    },
    songMovie: {
      color: "#20163a",
      fontSize: 12,
      fontWeight: "800",
      textAlign: "right",
    },
    songYear: {
      color: "#6f627e",
      fontSize: 12,
      marginTop: 4,
    },
    songTitle: {
      color: "#20163a",
      fontSize: 24,
      fontWeight: "900",
      marginBottom: 6,
    },
    songArtist: {
      color: "#584b68",
      fontSize: 15,
      lineHeight: 21,
      marginBottom: 16,
    },
    moodPill: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "rgba(255,255,255,0.72)",
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    moodText: {
      color: "#20163a",
      fontSize: 13,
      fontWeight: "700",
    },
  });

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
