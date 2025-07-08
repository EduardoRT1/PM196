import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');

// API de OMDB
const API_KEY = '1b0af068';
const BASE_URL = 'http://www.omdbapi.com';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchMode, setSearchMode] = useState('approximate'); // 'exact' o 'approximate'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const getMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${BASE_URL}/?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener detalles de película:', error);
      return null;
    }
  };

  const searchMovies = async (page = 1, newSearch = true) => {
    if (!searchText.trim()) {
      mostrarAlerta('Error', 'Por favor ingresa el nombre de una película');
      return;
    }

    setSearching(true);
    if (newSearch) {
      setMovies([]);
      setCurrentPage(1);
    }

    try {
      let url;
      
      if (searchMode === 'exact') {
        // Búsqueda exacta: buscar película específica
        url = `${BASE_URL}/?t=${encodeURIComponent(searchText.trim())}&apikey=${API_KEY}&type=movie`;
      } else {
        // Búsqueda aproximada: buscar múltiples resultados
        url = `${BASE_URL}/?s=${encodeURIComponent(searchText.trim())}&apikey=${API_KEY}&type=movie&page=${page}`;
      }

      // Crear dos promesas: una para la búsqueda y otra para el retraso
      const searchPromise = fetch(url).then(response => response.json());
      const delayPromise = new Promise(resolve => setTimeout(resolve, 3000)); // 3 segundos de retraso

      // Esperar a que ambas promesas se resuelvan
      const [data] = await Promise.all([searchPromise, delayPromise]);

      if (data.Response === 'False') {
        if (newSearch) {
          setMovies([]);
          mostrarAlerta('Sin resultados', data.Error || 'No se encontraron películas con ese nombre');
        }
        return;
      }

      if (searchMode === 'exact') {
        // Para búsqueda exacta, convertir el objeto a array
        setMovies([data]);
        setTotalResults(1);
      } else {
        // Para búsqueda aproximada, obtener detalles completos de cada película
        const moviesWithDetails = await Promise.all(
          data.Search.map(async (movie) => {
            const details = await getMovieDetails(movie.imdbID);
            return details ? {
              ...movie,
              imdbRating: details.imdbRating || 'N/A',
              Genre: details.Genre || 'Género no disponible',
              Plot: details.Plot || 'Sin descripción disponible',
              Director: details.Director || 'N/A',
              Runtime: details.Runtime || 'N/A'
            } : movie;
          })
        );
        
        const newMovies = newSearch ? moviesWithDetails : [...movies, ...moviesWithDetails];
        setMovies(newMovies);
        setTotalResults(parseInt(data.totalResults));
        setCurrentPage(page);
      }

    } catch (error) {
      console.error('Error al buscar películas:', error);
      mostrarAlerta('Error', 'No se pudo realizar la búsqueda. Verifica tu conexión a internet.');
    } finally {
      setSearching(false);
    }
  };

  const loadMoreMovies = () => {
    if (searchMode === 'approximate' && !searching && movies.length < totalResults) {
      searchMovies(currentPage + 1, false);
    }
  };

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje, [{ text: 'OK' }]);
    }
  };

  const formatearRating = (rating) => {
    if (!rating || rating === 'N/A') return 'Sin calificación';
    return `⭐ ${rating}`;
  };

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Image
        source={{
          uri: item.Poster !== 'N/A' 
            ? item.Poster
            : 'https://via.placeholder.com/300x450/cccccc/000000?text=Sin+Imagen'
        }}
        style={styles.moviePoster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.Title}
        </Text>
        <Text style={styles.movieYear}>
          📅 {item.Year}
        </Text>
        <Text style={styles.movieRating}>
          {formatearRating(item.imdbRating)}
        </Text>
        <Text style={styles.movieGenre}>
          🎭 {item.Genre || 'Género no disponible'}
        </Text>
        <Text style={styles.movieType}>
          🎬 {item.Type?.toUpperCase() || 'PELÍCULA'}
        </Text>
        {item.Plot && item.Plot !== 'N/A' && (
          <Text style={styles.moviePlot} numberOfLines={3}>
            {item.Plot}
          </Text>
        )}
      </View>
    </View>
  );

  const renderLoadMore = () => {
    if (searchMode === 'exact' || searching || movies.length >= totalResults) return null;
    
    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreMovies}>
        <Text style={styles.loadMoreText}>Cargar más películas</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.splash}>
        <View style={styles.splashContent}>
          <Text style={styles.splashIcon}>🎬</Text>
          <Text style={styles.splashText}>Buscador de Películas</Text>
          <Text style={styles.splashSubtext}>Powered by OMDB</Text>
          <ActivityIndicator size="large" color="#ffffff" style={styles.splashLoader} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎬 Buscar Películas</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ej: Avengers, Titanic, Batman..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => searchMovies(1, true)}
            returnKeyType="search"
          />
          
          <View style={styles.searchModeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                searchMode === 'exact' && styles.modeButtonActive
              ]}
              onPress={() => setSearchMode('exact')}
            >
              <Text style={[
                styles.modeButtonText,
                searchMode === 'exact' && styles.modeButtonTextActive
              ]}>
                🎯 Exacta
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modeButton,
                searchMode === 'approximate' && styles.modeButtonActive
              ]}
              onPress={() => setSearchMode('approximate')}
            >
              <Text style={[
                styles.modeButtonText,
                searchMode === 'approximate' && styles.modeButtonTextActive
              ]}>
                🔍 Aproximada
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[styles.searchButton, searching && styles.searchButtonDisabled]}
            onPress={() => searchMovies(1, true)}
            disabled={searching}
          >
            <Text style={styles.searchButtonText}>
              {searching ? '🔍 Buscando...' : '🚀 Buscar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {searching && movies.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Buscando películas...</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item, index) => `${item.imdbID || item.Title}-${index}`}
            contentContainerStyle={styles.moviesList}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderLoadMore}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🎭</Text>
                <Text style={styles.emptyText}>
                  {searchText ? 'No se encontraron películas' : 'Ingresa el nombre de una película para buscar'}
                </Text>
                <Text style={styles.emptySubtext}>
                  Prueba con: "Avatar", "Iron Man", "Frozen"
                </Text>
              </View>
            }
          />
        )}
      </View>
      
      {totalResults > 0 && (
        <View style={styles.resultsCounter}>
          <Text style={styles.resultsText}>
            📊 {movies.length} de {totalResults} resultados
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  splashContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  splashIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  splashText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  splashSubtext: {
    color: '#FF6B6B',
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  splashLoader: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    gap: 15,
  },
  searchInput: {
    height: 55,
    backgroundColor: 'white',
    borderRadius: 27,
    paddingHorizontal: 25,
    fontSize: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchModeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modeButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  modeButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: 'white',
  },
  searchButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 18,
    borderRadius: 27,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  moviesList: {
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  moviePoster: {
    width: 90,
    height: 135,
    borderRadius: 15,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    gap: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    lineHeight: 22,
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  movieRating: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  movieGenre: {
    fontSize: 13,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  movieType: {
    fontSize: 12,
    color: '#45B7D1',
    fontWeight: '600',
  },
  moviePlot: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
    marginTop: 5,
  },
  loadMoreButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  loadMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.2,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  resultsCounter: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resultsText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default App;