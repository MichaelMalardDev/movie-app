import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { updateSearchCount } from "@/services/firebase";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);

  const {
    data: movies,
    loading: moviesLoading,
    refetch: loadMovies,
    error: moviesError,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {

  //     if (searchQuery.trim()) {
  //       await loadMovies();

  //       // if (movies.length > 0 && movies?.[0])
  //       if (movies?.length! > 0 && movies?.[0] && !moviesLoading) {
  //         console.log('test');
  //         await updateSearchCount(searchQuery, movies[0]);
  //       }

  //     } else {
  //       reset();
  //     }
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [searchQuery]);

  // Appel seulement le fetch des films quand le texte change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Appel le updateSearchCount quand les movies sont disponibles
  useEffect(() => {
    if (searchQuery.trim() && movies?.length > 0) {
      const sorted = [...movies].sort((a, b) => b.popularity - a.popularity);
      setSortedMovies(sorted);

      updateSearchCount(searchQuery, sorted[0]); // utilise le plus populaire
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={sortedMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-4">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
