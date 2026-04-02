import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggleButton from "../../components/theme-toggle-button";
import { useAppTheme } from "../../theme/AppThemeContext";

type VillainStatus = {
  id: string;
  name: string;
  earth: string;
  realName: string;
  threatLevel: string;
  status: string;
  lastSeen: string;
  accent: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  bannerImage: string;
  portraitImage: string;
  statusTag: string;
  abilities: string[];
  description: string;
  crossEarthSightings: { earth: string; status: string; accent: string }[];
};
type EarthStatus = {
  id: string;
  earth: string;
  alias: string;
  status: string;
  level: string;
  summary: string;
  accent: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;

  image: string;
  missionTitle: string;
  missionPoints: string[];
  missionTag: string;
};

const VILLAIN_DATA: VillainStatus[] = [
  {
    id: "v1",
    name: "Green Goblin",
    earth: "Earth-96283",
    realName: "Norman Osborn",
    threatLevel: "CRITICAL",
    status: "At Large",
    lastSeen: "Earth-616 Statue of Liberty — 2d ago",
    accent: "#84cc16",
    icon: "ghost-outline",
    bannerImage: "https://cdn.marvel.com/content/2x/104gno_com_mas_mob_03.jpg",
    portraitImage:
      "https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20230319043828.jpg",
    statusTag: "Fractured Psyche",
    description:
      "Norman Osborn injected himself with an unstable Goblin Formula that split his mind into two warring identities. Armed with a razor glider, pumpkin bombs and military-grade reflexes, he has caused irreversible personal loss to Peter Parker across multiple universes. The most psychologically dangerous villain on record.",
    abilities: [
      "Goblin Formula Strength",
      "Razor Glider Combat",
      "Pumpkin Bomb Arsenal",
      "Tactical Genius",
      "Split Personality Unpredictability",
    ],
    crossEarthSightings: [
      { earth: "Earth-96283", status: "Origin", accent: "#84cc16" },
      { earth: "Earth-616", status: "Incursion — Active", accent: "#ef4444" },
      {
        earth: "Earth-199999",
        status: "Confirmed Sighting",
        accent: "#f97316",
      },
    ],
  },
  {
    id: "v2",
    name: "Doctor Octopus",
    earth: "Earth-96283",
    realName: "Dr. Otto Octavius",
    threatLevel: "HIGH",
    status: "Contained",
    lastSeen: "Spider-Society Holding — Bay 2",
    accent: "#f97316",
    icon: "spider-web",
    bannerImage:
      "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:67,cw:1066,ch:600,q:80,w:1066/yKLoEe4uYY4LV7HDyDHxpi.jpg",
    portraitImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5hqHCOxG_6Y_absgwY5NgFSrnsrfcPaEr0w&s",
    statusTag: "Detained",
    description:
      "A brilliant nuclear physicist whose neural inhibitor chip shattered, letting his four adamantium arms take over his mind. Octavius pursued a fusion reactor dream willing to sink Manhattan into the ocean to prove himself right. Detained after interdimensional retrieval and partial neural restoration by Parker.",
    abilities: [
      "4 Adamantium Tentacle Arms",
      "Multi-Point Simultaneous Combat",
      "Nuclear Engineering Genius",
      "Enhanced Reach & Crushing Grip",
      "Neural Interface Override",
    ],
    crossEarthSightings: [
      { earth: "Earth-96283", status: "Origin", accent: "#f97316" },
      { earth: "Earth-616", status: "Detained", accent: "#22c55e" },
      { earth: "Earth-199999", status: "Transferred", accent: "#6b7280" },
    ],
  },
  {
    id: "v3",
    name: "Venom",
    earth: "Earth-TRN700",
    realName: "Eddie Brock",
    threatLevel: "CRITICAL",
    status: "Active",
    lastSeen: "Earth-616 San Francisco — 6h ago",
    accent: "#a855f7",
    icon: "alien-outline",
    bannerImage:
      "https://w0.peakpx.com/wallpaper/151/636/HD-wallpaper-comics-venom-marvel-comics-spider-man.jpg",
    portraitImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Ei5rnyjwH65mns0D0Mv_iaYaiMHUIdCnAA&s",
    statusTag: "Symbiote Roaming",
    description:
      "The Klyntar symbiote bonded with disgraced journalist Eddie Brock, creating a lethal apex predator immune to Spider-Man's Spider-Sense. Venom oscillates between chaotic vigilante and all-consuming monster. A residual symbiote droplet left on Earth-616 poses active dimensional contamination risk.",
    abilities: [
      "Symbiote Bonding & Shapeshifting",
      "Spider-Sense Immunity",
      "Tendril Whip Combat",
      "Organic Wall-Crawling",
      "Accelerated Regeneration",
    ],
    crossEarthSightings: [
      { earth: "Earth-TRN700", status: "Origin", accent: "#a855f7" },
      { earth: "Earth-616", status: "Symbiote Residue", accent: "#ef4444" },
      { earth: "Earth-1610", status: "Trace Signal", accent: "#facc15" },
      { earth: "Earth-96283", status: "Variant Deceased", accent: "#6b7280" },
    ],
  },
  {
    id: "v4",
    name: "Electro",
    earth: "Earth-120703",
    realName: "Max Dillon",
    threatLevel: "HIGH",
    status: "Neutralised",
    lastSeen: "Earth-616 Statue of Liberty — 3d ago",
    accent: "#facc15",
    icon: "lightning-bolt-circle",
    bannerImage:
      "https://static0.cbrimages.com/wordpress/wp-content/uploads/2018/09/Electro-in-The-Amazing-Spider-Man-2.jpg?w=1200&h=900&fit=crop",
    portraitImage:
      "https://www.looper.com/img/gallery/the-untold-truth-of-marvels-electro/l-intro-1602803028.jpg",
    statusTag: "Power Drained",
    description:
      "Max Dillon fell into a tank of genetically altered electric eels at Oscorp and emerged as a living power plant. His craving for recognition morphed into a mission to drain the entire city grid. Neutralised when three Spider-Men combined their suit tech to overload his bioelectric field at the Statue of Liberty.",
    abilities: [
      "Pure Electrokinesis",
      "City Grid Absorption",
      "High-Voltage Plasma Blasts",
      "Bio-Electric Flight",
      "EM Field Disruption",
    ],
    crossEarthSightings: [
      { earth: "Earth-120703", status: "Origin", accent: "#facc15" },
      { earth: "Earth-616", status: "Neutralised", accent: "#3b82f6" },
      { earth: "Earth-50101", status: "Variant Active", accent: "#f97316" },
    ],
  },
  {
    id: "v5",
    name: "The Lizard",
    earth: "Earth-120703",
    realName: "Dr. Curt Connors",
    threatLevel: "HIGH",
    status: "Monitoring",
    lastSeen: "Midtown High Science Lab — 5d ago",
    accent: "#22c55e",
    icon: "snake",
    bannerImage:
      "https://www.themarysue.com/wp-content/uploads/2011/07/Spider-Man-4-The-Lizard.jpg",
    portraitImage:
      "https://d2thvodm3xyo6j.cloudfront.net/media/2016/04/d1ee453ad952-600x338.jpg",
    statusTag: "Serum Unstable",
    description:
      "One-armed herpetologist Dr. Curt Connors developed a cross-species reptile serum to regrow his limb. It worked — then it consumed him. The Lizard operates on pure primal instinct, attempting to trigger mass mutation across the city's water supply. Connors resurfaces intermittently but the serum's grip strengthens each cycle.",
    abilities: [
      "Reptile Limb Regeneration",
      "Sewer & Tunnel Mastery",
      "Superhuman Strength & Speed",
      "Toxic Scratch Venom",
      "Cross-Species Mutation Gas",
    ],
    crossEarthSightings: [
      { earth: "Earth-120703", status: "Origin", accent: "#22c55e" },
      { earth: "Earth-616", status: "Monitored", accent: "#facc15" },
      { earth: "Earth-96283", status: "Variant Sighted", accent: "#f97316" },
    ],
  },
  {
    id: "v6",
    name: "Sandman",
    earth: "Earth-96283",
    realName: "Flint Marko",
    threatLevel: "MEDIUM",
    status: "Unstable",
    lastSeen: "Earth-616 Brooklyn Waterfront — 1d ago",
    accent: "#d97706",
    icon: "weather-dust",
    bannerImage:
      "https://www.theloadout.com/wp-content/sites/theloadout/2023/10/spider-man-2-ps5-villains-sandman-550x309.jpg",
    portraitImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIFN-dCCkkKmg5M00d8bPfRRgPaTk0pBb7w&s",
    statusTag: "Dispersing",
    description:
      "Escaped convict Flint Marko stumbled into a particle physics test site and had his body fused at a molecular level with sand. Driven by love for his dying daughter rather than pure malice, Sandman occupies a moral grey zone. His mass integrity is deteriorating — each re-solidification takes longer and leaves him less coherent.",
    abilities: [
      "Full Sand Shapeshifting",
      "Mass Dispersal & Reformation",
      "Near-Physical Invulnerability",
      "Giant Sand Construct Combat",
      "Particle Density Control",
    ],
    crossEarthSightings: [
      { earth: "Earth-96283", status: "Origin", accent: "#d97706" },
      {
        earth: "Earth-616",
        status: "Unstable — Dispersing",
        accent: "#ef4444",
      },
      { earth: "Earth-199999", status: "Signal Faint", accent: "#6b7280" },
    ],
  },
  {
    id: "v7",
    name: "Mysterio",
    earth: "Earth-199999",
    realName: "Quentin Beck",
    threatLevel: "HIGH",
    status: "Deceased",
    lastSeen: "Tower Bridge, London — Final Incident",
    accent: "#06b6d4",
    icon: "eye-circle-outline",
    bannerImage:
      "https://hips.hearstapps.com/hmg-prod/images/jake-gyllenhaal-spiderman-far-from-home-1547562915.jpg?crop=1xw:1xh;center,top&resize=980:*",
    portraitImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrus5cy9qQc9kfMd-kyWAJhUVDz_My6fw4Gw&s",
    statusTag: "Legacy Threat",
    description:
      "Former Stark Industries holographic engineer Quentin Beck weaponised drone swarms to stage fake Elemental attacks across Europe, positioning himself as Earth's new hero. He exposed Peter Parker's identity to the world before dying from his own deflected blaster. His pre-recorded media package continues to be a live global threat.",
    abilities: [
      "E.D.I.T.H. Drone Swarms",
      "BARF Holographic Projection",
      "Master-Level Tactical Deception",
      "Elemental Illusion Fabrication",
      "Neural Sensory Disruption",
    ],
    crossEarthSightings: [
      { earth: "Earth-199999", status: "Deceased", accent: "#6b7280" },
      { earth: "Earth-616", status: "Identity Leak Active", accent: "#ef4444" },
      { earth: "Earth-833", status: "Variant Unconfirmed", accent: "#06b6d4" },
    ],
  },
  {
    id: "v8",
    name: "Vulture",
    earth: "Earth-199999",
    realName: "Adrian Toomes",
    threatLevel: "HIGH",
    status: "Escaped",
    lastSeen: "Cross-Dimensional Prison Transport — Signal Lost",
    accent: "#64748b",
    icon: "feather",
    bannerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPmYNkQn6EmvuXRiu7ZQaC9tLZFtBwKIXKw&s",
    portraitImage:
      "https://pyxis.nymag.com/v1/imgs/f66/e87/d8f85141e0171cebe0bbbfb749ab0be8f4-05-keaton-spiderman-2.rsquare.w400.jpg",
    statusTag: "Prison Break",
    description:
      "Salvage contractor Adrian Toomes was wiped out by Stark Industries after the Chitauri invasion and turned to the black market — retrofitting alien tech into weapons for crime. His Chitauri-alloy wing suit makes him lethal in aerial combat. He escaped during a cross-dimensional prison transfer failure. Location currently unknown.",
    abilities: [
      "Chitauri-Alloy Wing Suit",
      "Salvaged Alien Tech Arsenal",
      "Elite Aerial Combat",
      "Anti-Gravity Boosted Flight",
      "Underground Arms Network",
    ],
    crossEarthSightings: [
      { earth: "Earth-199999", status: "Origin", accent: "#64748b" },
      { earth: "Earth-928", status: "Variant Detained", accent: "#22c55e" },
      { earth: "Earth-80920", status: "Escaped", accent: "#ef4444" },
    ],
  },
  {
    id: "v9",
    name: "Kingpin",
    earth: "Earth-1610",
    realName: "Wilson Fisk",
    threatLevel: "CRITICAL",
    status: "Active",
    lastSeen: "Earth-1610 NYC Fisk Tower — 8h ago",
    accent: "#f43f5e",
    icon: "crown-outline",
    bannerImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIGzxKC4r5DHmlK34QLXXaDDyvAkxdLxYWuw&s",
    portraitImage:
      "https://static.wikia.nocookie.net/villains/images/6/62/Kingpin_TAS_Profile_Image_2.png/revision/latest/thumbnail/width/360/height/360?cb=20200213054249",
    statusTag: "Running Operations",
    description:
      "Wilson Fisk built New York's most powerful criminal empire through ruthless intelligence and terrifying physical dominance. Obsessed with reclaiming a version of his lost family, he constructed a supercollider beneath Brooklyn that nearly fractured the multiverse. Still operating freely from Fisk Tower — politically shielded and untouchable.",
    abilities: [
      "Superhuman Physical Mass",
      "Criminal Empire Command",
      "Supercollider Tech Access",
      "Political & Legal Immunity",
      "Brutal Bare-Hands Combat",
    ],
    crossEarthSightings: [
      { earth: "Earth-1610", status: "Active HQ", accent: "#ef4444" },
      { earth: "Earth-616", status: "Variant Operating", accent: "#f97316" },
      { earth: "Earth-199999", status: "Financial Links", accent: "#facc15" },
      { earth: "Earth-TRN123", status: "Collider Breach", accent: "#a855f7" },
    ],
  },
  {
    id: "v10",
    name: "Carnage",
    earth: "Earth-TRN700",
    realName: "Cletus Kasady",
    threatLevel: "CRITICAL",
    status: "Active",
    lastSeen: "Earth-TRN700 Ravencroft — 12h ago",
    accent: "#ef4444",
    icon: "skull-crossbones-outline",
    bannerImage:
      "https://static0.cbrimages.com/wordpress/wp-content/uploads/2020/01/Carnage-Venom.jpg",
    portraitImage:
      "https://i.pinimg.com/736x/97/f4/18/97f4182a31b530285e8e5f9c886419db.jpg",
    statusTag: "Apex Predator",
    description:
      "Serial killer Cletus Kasady received a blood transfusion of Eddie Brock's symbiote-laced blood, bonding with an offspring of Venom at a cellular level. Unlike Venom, Carnage has no moral conflict — only an insatiable hunger to kill. Kasady's symbiote is immune to the sonic and flame weaknesses that limit other Klyntar, making standard containment protocols useless.",
    abilities: [
      "Blood-Bonded Symbiote (Unbreakable)",
      "Sonic & Flame Resistance",
      "Tendril Blade Generation",
      "Psychotic Combat Instinct",
      "Rapid Full-Body Mutation",
    ],
    crossEarthSightings: [
      { earth: "Earth-TRN700", status: "Active — Escaped", accent: "#ef4444" },
      { earth: "Earth-616", status: "Variant Incarcerated", accent: "#f97316" },
      { earth: "Earth-1610", status: "Symbiote Echo", accent: "#a855f7" },
    ],
  },
];

const EARTH_STATUS_DATA: EarthStatus[] = [
  {
    id: "1",
    earth: "Earth-65",
    alias: "Spider-Gwen Home",
    status: "Stable",
    level: "Green",
    summary: "Portal signatures are calm and Gwen's world is reading clean.",
    accent: "#ff5fa2",
    icon: "spider-thread",

    image: "https://picsum.photos/seed/earth65gwen/700/320",
    missionTitle: "Op: White Spider",
    missionPoints: [
      "Maintain low-emission spider-signal relay across Manhattan grid.",
      "Coordinate covert check-ins with Captain Stacy every 48 hours.",
      "Monitor NYPD scanner for anomalous dimensional energy mentions.",
    ],
    missionTag: "Recon",
  },
  {
    id: "2",
    earth: "Earth-1610",
    alias: "Miles Morales Sector",
    status: "High Activity",
    level: "Amber",
    summary:
      "Cross-dimensional traffic is elevated after recent collider spikes.",
    accent: "#63d9ff",
    icon: "lightning-bolt",

    image: "https://picsum.photos/seed/earth1610miles/700/320",
    missionTitle: "Op: Live Wire",
    missionPoints: [
      "Deploy beacon drones at three collider epicentre coordinates.",
      "Intercept rogue portal threads before they anchor in civilian zones.",
      "Assess bioelectric field readings around Miles's known patrol route.",
    ],
    missionTag: "High Priority",
  },
  {
    id: "3",
    earth: "Earth-928",
    alias: "Nueva York",
    status: "Monitored",
    level: "Blue",
    summary: "Spider-Society systems are online with minor signal congestion.",
    accent: "#7b61ff",
    icon: "city-variant-outline",

    image: "https://picsum.photos/seed/earth928nueva/700/320",
    missionTitle: "Op: Nexus Point",
    missionPoints: [
      "Synchronise Spider-Society HQ server logs with the multi-verse map.",
      "Run diagnostics on Lyla AI inference modules — flag any drift.",
      "Patch signal congestion on channels 7-C through 12-F before next sync.",
    ],
    missionTag: "Maintenance",
  },
  {
    id: "4",
    earth: "Earth-50101",
    alias: "Mumbattan",
    status: "Recovery",
    level: "Amber",
    summary:
      "Anomaly fallout is stabilizing, but portal stress still needs review.",
    accent: "#ff9f5a",
    icon: "map-marker-radius-outline",

    image: "https://picsum.photos/seed/earth50101mumbattan/700/320",
    missionTitle: "Op: Rising Tide",
    missionPoints: [
      "Re-anchor three destabilised portal nodes in the harbour district.",
      "Restore Pavitr's local web-comm network to full encryption.",
      "Survey structural integrity of the Vortex Bridge collapse radius.",
    ],
    missionTag: "Recovery",
  },
  {
    id: "5",
    earth: "Earth-138",
    alias: "Spider-Punk Route",
    status: "Unpredictable",
    level: "Pink",
    summary:
      "Chaotic signatures remain noisy, but the route is currently contained.",
    accent: "#ff73b9",
    icon: "guitar-electric",

    image: "https://picsum.photos/seed/earth138punk/700/320",
    missionTitle: "Op: Static Noise",
    missionPoints: [
      "Isolate chaotic energy bursts from Hobart's rogue frequency band.",
      "Deploy signal dampeners along the three active noise corridors.",
      "Cross-reference dimensional static patterns with known anarchic signatures.",
    ],
    missionTag: "Containment",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Recon: { bg: "#22c55e22", text: "#22c55e" },
  "High Priority": { bg: "#ef444422", text: "#ef4444" },
  Maintenance: { bg: "#3b82f622", text: "#3b82f6" },
  Recovery: { bg: "#f97316 22", text: "#f97316" },
  Containment: { bg: "#a855f722", text: "#a855f7" },
};

const VILLAIN_STATUS_COLORS: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  "At Large": { bg: "#ef444422", text: "#ef4444", dot: "#ef4444" },
  Contained: { bg: "#22c55e22", text: "#22c55e", dot: "#22c55e" },
  Active: { bg: "#f9731622", text: "#f97316", dot: "#f97316" },
  Monitoring: { bg: "#facc1522", text: "#facc15", dot: "#facc15" },
  Neutralised: { bg: "#3b82f622", text: "#3b82f6", dot: "#3b82f6" },
  Destroyed: { bg: "#6b728022", text: "#9ca3af", dot: "#6b7280" },
  Compromised: { bg: "#818cf822", text: "#818cf8", dot: "#818cf8" },
  Deceased: { bg: "#6b728022", text: "#9ca3af", dot: "#6b7280" },
  Escaped: { bg: "#ef444433", text: "#fca5a5", dot: "#ef4444" },
  Unstable: { bg: "#d9770622", text: "#d97706", dot: "#d97706" },
};

const THREAT_COLORS: Record<string, string> = {
  CRITICAL: "#ef4444",
  HIGH: "#f97316",
  MEDIUM: "#facc15",
  LOW: "#22c55e",
};

const SpiderHQScreen = () => {
  const { theme } = useAppTheme();
  const isDark = theme.mode === "dark";
  const styles = createStyles(theme);

  const renderVillainCard = (villain: VillainStatus) => {
    const statusColor = VILLAIN_STATUS_COLORS[villain.status] ?? {
      bg: villain.accent + "22",
      text: villain.accent,
      dot: villain.accent,
    };
    const threatColor = THREAT_COLORS[villain.threatLevel] ?? "#9ca3af";

    return (
      <View
        key={villain.id}
        style={[styles.villainCard, { borderColor: threatColor + "55" }]}
      >
        <View style={styles.villainBannerWrap}>
          <Image
            source={{ uri: villain.bannerImage }}
            style={styles.villainBannerImage}
            resizeMode="cover"
          />

          <View style={styles.villainBannerGradient} />

          <View
            style={[
              styles.villainBannerAccent,
              { backgroundColor: threatColor + "30" },
            ]}
          />

          <View
            style={[
              styles.threatBadge,
              { backgroundColor: threatColor + "ee" },
            ]}
          >
            <MaterialCommunityIcons
              name="alert-octagon"
              size={10}
              color="#fff"
            />
            <Text style={styles.threatBadgeText}>{villain.threatLevel}</Text>
          </View>

          <View
            style={[styles.villainStatusPill, { backgroundColor: "#000000bb" }]}
          >
            <View
              style={[styles.villainDot, { backgroundColor: statusColor.dot }]}
            />
            <Text
              style={[
                styles.villainStatusPillText,
                { color: statusColor.text },
              ]}
            >
              {villain.status}
            </Text>
          </View>

          <View
            style={[styles.villainPortraitRing, { borderColor: threatColor }]}
          >
            <Image
              source={{ uri: villain.portraitImage }}
              style={styles.villainPortrait}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.villainCardBody}>
          <View style={styles.villainNameRow}>
            <View style={styles.villainNameBlock}>
              <Text style={styles.villainName}>{villain.name}</Text>
              <Text style={styles.villainRealName}>{villain.realName}</Text>
            </View>
            <View style={styles.villainMetaRight}>
              <View
                style={[
                  styles.villainIconWrap,
                  { backgroundColor: threatColor + "22" },
                ]}
              >
                <MaterialCommunityIcons
                  name={villain.icon}
                  size={18}
                  color={threatColor}
                />
              </View>
              <View
                style={[
                  styles.villainEarthBadge,
                  { backgroundColor: isDark ? "#ffffff12" : "#00000010" },
                ]}
              >
                <Text style={styles.villainEarthText}>{villain.earth}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lastSeenRow}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={13}
              color={isDark ? "#9e8fbe" : "#8a7898"}
            />
            <Text style={styles.lastSeenText}>{villain.lastSeen}</Text>
          </View>

          <Text style={styles.villainDescription}>{villain.description}</Text>

          <View
            style={[
              styles.abilitiesBox,
              {
                borderColor: threatColor + "33",
                backgroundColor: isDark
                  ? threatColor + "0d"
                  : threatColor + "08",
              },
            ]}
          >
            <View style={styles.abilitiesHeader}>
              <MaterialCommunityIcons
                name="dna"
                size={13}
                color={threatColor}
              />
              <Text style={[styles.abilitiesTitle, { color: threatColor }]}>
                Known Abilities
              </Text>
              <View
                style={[
                  styles.statusTagPill,
                  { backgroundColor: statusColor.bg },
                ]}
              >
                <Text
                  style={[styles.statusTagText, { color: statusColor.text }]}
                >
                  {villain.statusTag}
                </Text>
              </View>
            </View>
            <View style={styles.abilitiesWrap}>
              {villain.abilities.map((ability, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.abilityPill,
                    { backgroundColor: threatColor + "18" },
                  ]}
                >
                  <View
                    style={[
                      styles.abilityDot,
                      { backgroundColor: threatColor },
                    ]}
                  />
                  <Text
                    style={[
                      styles.abilityText,
                      { color: isDark ? "#e2d5f8" : "#3a2f52" },
                    ]}
                  >
                    {ability}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={[
              styles.crossEarthBox,
              {
                borderColor: isDark ? "#ffffff10" : "#00000010",
                backgroundColor: isDark ? "#ffffff06" : "#00000005",
              },
            ]}
          >
            <View style={styles.crossEarthHeader}>
              <MaterialCommunityIcons
                name="earth"
                size={13}
                color={isDark ? "#9e8fbe" : "#8a7898"}
              />
              <Text style={styles.crossEarthTitle}>Cross-Earth Sightings</Text>
            </View>
            <View style={styles.crossEarthList}>
              {villain.crossEarthSightings.map((sighting, idx) => (
                <View key={idx} style={styles.crossEarthRow}>
                  <View
                    style={[
                      styles.crossEarthDot,
                      { backgroundColor: sighting.accent },
                    ]}
                  />
                  <Text style={styles.crossEarthName}>{sighting.earth}</Text>
                  <View
                    style={[
                      styles.crossEarthStatusPill,
                      { backgroundColor: sighting.accent + "20" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.crossEarthStatusText,
                        { color: sighting.accent },
                      ]}
                    >
                      {sighting.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={EARTH_STATUS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <View style={styles.heroCard}>
              <View style={styles.topRow}>
                <View style={styles.textWrap}>
                  <Text style={styles.eyebrow}>Mission Control</Text>
                  <Text style={styles.title}>Spider HQ</Text>
                  <Text style={styles.headerSubtitle}>
                    Villains and Live status across all tracked dimensions.
                  </Text>
                </View>
                <ThemeToggleButton iconVariant="gwen-theme" />
              </View>

              <View style={styles.metricsRow}>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>05</Text>
                  <Text style={styles.metricLabel}>Tracked Earths</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>02</Text>
                  <Text style={styles.metricLabel}>Active Alerts</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>05</Text>
                  <Text style={styles.metricLabel}>Live Missions</Text>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.villainSection}>
            <View style={styles.villainSectionHeader}>
              <View style={styles.villainSectionTitleRow}>
                <View style={styles.villainSectionIconWrap}>
                  <MaterialCommunityIcons
                    name="biohazard"
                    size={20}
                    color="#f43f5e"
                  />
                </View>
                <View style={styles.villainSectionTextWrap}>
                  <Text style={styles.villainSectionEyebrow}>
                    Threat Intelligence
                  </Text>
                  <Text style={styles.villainSectionTitle}>
                    Villain Status Board
                  </Text>
                </View>
              </View>
              <Text style={styles.villainSectionSubtitle}>
                Tracking 10 known Spider-Man threats across all monitored
                dimensions. Last sync: 12 min ago.
              </Text>

              <View style={styles.villainStatsRow}>
                <View
                  style={[
                    styles.villainStatChip,
                    { backgroundColor: "#ef444422" },
                  ]}
                >
                  <View
                    style={[styles.statDot, { backgroundColor: "#ef4444" }]}
                  />
                  <Text style={[styles.statChipText, { color: "#ef4444" }]}>
                    4 Critical
                  </Text>
                </View>
                <View
                  style={[
                    styles.villainStatChip,
                    { backgroundColor: "#f9731622" },
                  ]}
                >
                  <View
                    style={[styles.statDot, { backgroundColor: "#f97316" }]}
                  />
                  <Text style={[styles.statChipText, { color: "#f97316" }]}>
                    5 High
                  </Text>
                </View>
                <View
                  style={[
                    styles.villainStatChip,
                    { backgroundColor: "#facc1522" },
                  ]}
                >
                  <View
                    style={[styles.statDot, { backgroundColor: "#facc15" }]}
                  />
                  <Text style={[styles.statChipText, { color: "#facc15" }]}>
                    1 Medium
                  </Text>
                </View>
              </View>
            </View>

            {VILLAIN_DATA.map((villain) => renderVillainCard(villain))}
          </View>
        }
        renderItem={({ item }) => {
          const tagColor = TAG_COLORS[item.missionTag] ?? {
            bg: item.accent + "22",
            text: item.accent,
          };

          return (
            <View
              style={[styles.statusCard, { borderColor: item.accent + "66" }]}
            >
              <View style={styles.imageWrap}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View
                  style={[
                    styles.imageOverlay,
                    { backgroundColor: item.accent + "33" },
                  ]}
                />

                <View style={styles.imageEarthBadge}>
                  <Text style={styles.imageEarthText}>{item.earth}</Text>
                </View>

                <View
                  style={[
                    styles.imageStatusPill,
                    { backgroundColor: item.accent + "ee" },
                  ]}
                >
                  <Text style={styles.imageStatusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: item.accent + "22" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={item.accent}
                    />
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.earth}>{item.earth}</Text>
                    <Text style={styles.alias}>{item.alias}</Text>
                  </View>

                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: item.accent + "22" },
                    ]}
                  >
                    <View
                      style={[
                        styles.levelDot,
                        { backgroundColor: item.accent },
                      ]}
                    />
                    <Text style={[styles.levelValue, { color: item.accent }]}>
                      {item.level}
                    </Text>
                  </View>
                </View>

                <Text style={styles.summary}>{item.summary}</Text>

                <View
                  style={[
                    styles.missionBox,
                    {
                      borderColor: item.accent + "44",
                      backgroundColor: isDark
                        ? item.accent + "0d"
                        : item.accent + "09",
                    },
                  ]}
                >
                  <View style={styles.missionHeader}>
                    <MaterialCommunityIcons
                      name="target"
                      size={15}
                      color={item.accent}
                    />
                    <Text style={[styles.missionTitle, { color: item.accent }]}>
                      {item.missionTitle}
                    </Text>

                    <View
                      style={[
                        styles.missionTag,
                        { backgroundColor: tagColor.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.missionTagText,
                          { color: tagColor.text },
                        ]}
                      >
                        {item.missionTag}
                      </Text>
                    </View>
                  </View>

                  {item.missionPoints.map((point, idx) => (
                    <View key={idx} style={styles.missionPoint}>
                      <View
                        style={[
                          styles.bullet,
                          { backgroundColor: item.accent },
                        ]}
                      />
                      <Text style={styles.missionPointText}>{point}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.footerRow}>
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={14}
                    color={isDark ? "#9e8fbe" : "#8a7898"}
                  />
                  <Text style={styles.levelLabel}>Threat Level</Text>
                  <Text style={[styles.footerLevel, { color: item.accent }]}>
                    {item.level}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SpiderHQScreen;

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) => {
  const isDark = theme.mode === "dark";

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#0e0a1a" : "#f4edf8",
    },
    listContent: {
      padding: 16,
      paddingBottom: 36,
      gap: 16,
    },
    headerWrap: {
      marginBottom: 6,
    },

    heroCard: {
      backgroundColor: isDark ? "#1a1030" : "#20163a",
      borderRadius: 28,
      padding: 22,
      borderWidth: 1,
      borderColor: isDark ? "#6a4e8a" : "#5e3f78",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
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
      marginBottom: 8,
    },
    headerSubtitle: {
      color: "#c8b8e8",
      fontSize: 13,
      lineHeight: 19,
    },
    metricsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 18,
    },
    metricCard: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.10)",
      borderRadius: 16,
      padding: 12,
    },
    metricValue: {
      color: "#63d9ff",
      fontSize: 22,
      fontWeight: "900",
      marginBottom: 4,
    },
    metricLabel: {
      color: "#d4c4f0",
      fontSize: 11,
      fontWeight: "700",
    },

    statusCard: {
      borderRadius: 22,
      borderWidth: 1.5,
      overflow: "hidden",
      backgroundColor: isDark ? "#15102a" : "#ffffff",
      shadowColor: "#20163a",
      shadowOpacity: isDark ? 0 : 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 5 },
      elevation: isDark ? 0 : 3,
    },

    imageWrap: {
      width: "100%",
      height: 160,
      position: "relative",
    },
    cardImage: {
      width: "100%",
      height: "100%",
    },

    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
    },

    imageEarthBadge: {
      position: "absolute",
      bottom: 10,
      left: 12,
      backgroundColor: "rgba(0,0,0,0.55)",
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    imageEarthText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.5,
    },

    imageStatusPill: {
      position: "absolute",
      top: 10,
      right: 12,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    imageStatusText: {
      color: "#ffffff",
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    cardBody: {
      padding: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 12,
    },
    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: "center",
      justifyContent: "center",
    },
    cardHeaderText: { flex: 1 },
    earth: {
      color: isDark ? "#f0eaff" : "#20163a",
      fontSize: 17,
      fontWeight: "900",
    },
    alias: {
      color: isDark ? "#c4b2dc" : "#6a5c78",
      fontSize: 12,
      marginTop: 2,
    },

    levelBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    levelDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    levelValue: {
      fontSize: 12,
      fontWeight: "900",
    },

    summary: {
      color: isDark ? "#d4c4e8" : "#584b68",
      fontSize: 13,
      lineHeight: 20,
      marginBottom: 14,
    },

    missionBox: {
      borderRadius: 14,
      borderWidth: 1,
      padding: 14,
      marginBottom: 14,
      gap: 10,
    },
    missionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    missionTitle: {
      flex: 1,
      fontSize: 14,
      fontWeight: "900",
      letterSpacing: 0.3,
    },
    missionTag: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    missionTagText: {
      fontSize: 10,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    missionPoint: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    bullet: {
      width: 5,
      height: 5,
      borderRadius: 3,
      marginTop: 7,
      flexShrink: 0,
    },
    missionPointText: {
      flex: 1,
      color: isDark ? "#cfc0e8" : "#4a3d60",
      fontSize: 13,
      lineHeight: 19,
    },

    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    levelLabel: {
      flex: 1,
      color: isDark ? "#9e8fbe" : "#8a7898",
      fontSize: 11,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    footerLevel: {
      fontSize: 13,
      fontWeight: "900",
    },

    villainSection: {
      gap: 14,
      marginTop: 8,
    },

    villainSectionHeader: {
      backgroundColor: isDark ? "#1a0a14" : "#2a0d1a",
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: isDark ? "#7f1d3a" : "#6b1630",
      gap: 14,
    },

    villainSectionTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    villainSectionIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#f43f5e22",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#f43f5e44",
    },

    villainSectionTextWrap: { flex: 1 },

    villainSectionEyebrow: {
      color: "#f43f5e",
      fontSize: 11,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 3,
    },

    villainSectionTitle: {
      color: "#ffffff",
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: 0.2,
    },

    villainSectionSubtitle: {
      color: "#e0aaba",
      fontSize: 12,
      lineHeight: 18,
    },

    villainStatsRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },

    villainStatChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },

    statDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },

    statChipText: {
      fontSize: 11,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    // Villain Cards
    villainCard: {
      borderRadius: 22,
      borderWidth: 1.5,
      overflow: "hidden",
      backgroundColor: isDark ? "#130a12" : "#ffffff",
      shadowColor: "#1a0008",
      shadowOpacity: isDark ? 0 : 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 5 },
      elevation: isDark ? 0 : 3,
    },

    villainBannerWrap: {
      width: "100%",
      height: 160,
      position: "relative",
    },

    villainBannerImage: {
      width: "100%",
      height: "100%",
    },

    villainBannerGradient: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.45)",
    },

    villainBannerAccent: {
      ...StyleSheet.absoluteFillObject,
    },

    threatBadge: {
      position: "absolute",
      top: 10,
      left: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      borderRadius: 8,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },

    threatBadgeText: {
      color: "#ffffff",
      fontSize: 10,
      fontWeight: "900",
      textTransform: "uppercase" as const,
      letterSpacing: 0.8,
    },

    villainStatusPill: {
      position: "absolute",
      top: 10,
      right: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 11,
      paddingVertical: 5,
    },

    villainDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },

    villainStatusPillText: {
      fontSize: 11,
      fontWeight: "900",
    },

    // Portrait circle overlapping banner bottom
    villainPortraitRing: {
      position: "absolute",
      bottom: -28,
      left: 16,
      width: 62,
      height: 62,
      borderRadius: 31,
      borderWidth: 3,
      overflow: "hidden",
      backgroundColor: "#1a0a12",
    },

    villainPortrait: {
      width: "100%",
      height: "100%",
    },

    villainCardBody: {
      paddingTop: 38, // leaves room for the portrait overlap
      paddingHorizontal: 16,
      paddingBottom: 16,
      gap: 10,
    },

    // Name row sits beside portrait space
    villainNameRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },

    villainNameBlock: {
      flex: 1,
      paddingLeft: 78, // offset for portrait width + gap
    },

    villainMetaRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    villainCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    villainIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },

    villainHeaderText: { flex: 1 },

    villainName: {
      color: isDark ? "#ffe4ee" : "#1a0010",
      fontSize: 17,
      fontWeight: "900",
    },

    villainRealName: {
      color: isDark ? "#c49aaa" : "#6a3848",
      fontSize: 12,
      marginTop: 2,
    },

    villainEarthBadge: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },

    villainEarthText: {
      color: isDark ? "#e0d0dc" : "#3a1a28",
      fontSize: 11,
      fontWeight: "800",
    },

    lastSeenRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    lastSeenText: {
      color: isDark ? "#b8a0b0" : "#7a5a68",
      fontSize: 12,
      fontWeight: "600",
    },

    villainDescription: {
      color: isDark ? "#d4c0cc" : "#584050",
      fontSize: 13,
      lineHeight: 20,
    },

    abilitiesBox: {
      borderRadius: 14,
      borderWidth: 1,
      padding: 13,
      gap: 10,
    },

    abilitiesHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },

    abilitiesTitle: {
      flex: 1,
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.3,
    },

    statusTagPill: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },

    statusTagText: {
      fontSize: 10,
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },

    abilitiesWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    abilityPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderRadius: 999,
      paddingHorizontal: 11,
      paddingVertical: 5,
    },

    abilityDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
    },

    abilityText: {
      fontSize: 12,
      fontWeight: "700",
    },

    // Cross-earth sightings
    crossEarthBox: {
      borderRadius: 14,
      borderWidth: 1,
      padding: 13,
      gap: 10,
    },

    crossEarthHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },

    crossEarthTitle: {
      color: isDark ? "#9e8fbe" : "#8a7898",
      fontSize: 12,
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    crossEarthList: {
      gap: 8,
    },

    crossEarthRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    crossEarthDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    crossEarthName: {
      flex: 1,
      color: isDark ? "#e0d0dc" : "#3a2840",
      fontSize: 13,
      fontWeight: "700",
    },

    crossEarthStatusPill: {
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },

    crossEarthStatusText: {
      fontSize: 11,
      fontWeight: "800",
    },
  });
};
