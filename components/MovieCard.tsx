import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = "row", onSelect }: MovieCardProps) {
  const isTile = layout === "tile";
  const ratingText = `⭐ ${movie.rating}`;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(movie.id)}
      style={[styles.card, isTile && styles.cardTile]}
    >
      <View style={isTile && styles.posterBoxTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />
        {isTile && <Text style={styles.badge}>{ratingText}</Text>}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.meta}>
            {movie.genre} • {movie.year}
          </Text>
        )}
        {!isTile && <Text style={styles.rating}>{ratingText}</Text>}

        <Text style={styles.status}>
          {movie.isWatched ? "✅ Đã xem" : "⏳ Chưa xem"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    elevation: 2, // bóng Android
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4, // bóng iOS
  },
  poster: { width: 70, height: 100, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10, justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "bold" },
  meta: { color: "#666", marginTop: 2 },
  rating: { marginTop: 4, color: "#e69500", fontWeight: "600" },
  status: { marginTop: 4 },

  cardTile: { flexDirection: "column", padding: 0, overflow: "hidden" },
  posterBoxTile: { width: "100%" },
  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.65)",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold",
  },
  infoTile: { marginLeft: 0, padding: 8 },
});
