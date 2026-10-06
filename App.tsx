import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import MovieCard, { Movie } from "./components/MovieCard";
import { useCallback, useEffect, useState } from "react";

const API = "https://6ac4b83554a61668c5f61e58.mockapi.io/movies";

function MainScreen() {
  const PADDING = 12;
  const GAP = 12;

  const [isTile, setIsTile] = useState<boolean>(false);
  const numColumns = isTile ? 2 : 1;
  const { width } = useWindowDimensions();
  const itemWidth = (width - PADDING * 2 - GAP) / 2;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSelect = useCallback(
    (id: string) => {
      const m = movies.find((x) => x.id === id);
      if (m) Alert.alert(`${m.title} (${m.year})`);
    },
    [movies],
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (e) {
        console.log("Loi tai du lieu ", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Movie App</Text>
        <View style={styles.switchRow}>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      <View>
        {loading ? (
          <ActivityIndicator size={"large"} style={{ flex: 1 }} />
        ) : (
          <FlatList
            key={String(numColumns)} // ý c
            data={movies}
            numColumns={numColumns} // ý b
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: PADDING }}
            columnWrapperStyle={isTile ? { gap: GAP } : undefined} // ý d
            renderItem={({ item }) => (
              <View style={isTile ? { width: itemWidth } : undefined}>
                <MovieCard
                  movie={item}
                  layout={isTile ? "tile" : "row"}
                  onSelect={handleSelect}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <MainScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  item: { paddingBottom: 10 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
});
