import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { surahData, juzData } from './data';

const MainPage = () => {
  const [activeOption, setActiveOption] = useState('Surah');
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredSurahData = surahData.filter(surah => surah.name.toLowerCase().includes(searchText.toLowerCase()));
  const filteredJuzData = juzData.filter(juz => juz.name.toLowerCase().includes(searchText.toLowerCase()));

  const renderList = () => {
    if (activeOption === 'Surah') {
      return (
        <FlatList
          style={styles.flatList}
          data={filteredSurahData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, searchText && item.name.toLowerCase().includes(searchText.toLowerCase()) && styles.highlight, isDarkMode ? styles.darkMode : styles.lightMode]}>
              <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Surah Name: {item.name}</Text>
              <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Juz: {item.juz}</Text>
              <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Tafseer: {item.tafseer}</Text>
            </View>
          )}
        />
      );
    } else {
      return (
        <FlatList
          style={styles.flatList}
          data={filteredJuzData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, searchText && item.name.toLowerCase().includes(searchText.toLowerCase()) && styles.highlight, isDarkMode ? styles.darkMode : styles.lightMode]}>
              <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Juz Name: {item.name}</Text>
              {/* Render Surahs included in this Juz */}
              {item.surahs.map((surahId) => {
                const surah = surahData.find((surah) => surah.id === surahId);
                return (
                  <View key={surah.id}>
                    <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Surah Name: {surah.name}</Text>
                    <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Juz: {surah.juz}</Text>
                    <Text style={[styles.itemText, isDarkMode && styles.darkModeText]}>Tafseer: {surah.tafseer}</Text>
                  </View>
                );
              })}
            </View>
          )}
        />
      );
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeBackground : styles.lightModeBackground]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            title="Surah"
            onPress={() => setActiveOption('Surah')}
            color={activeOption === 'Surah' ? 'blue' : 'gray'} // Set the color based on activeOption
          />
          <Button
            title="Juz"
            onPress={() => setActiveOption('Juz')}
            color={activeOption === 'Juz' ? 'blue' : 'gray'} // Set the color based on activeOption
          />
        </View>
      </View>
      <TextInput
        style={[styles.searchInput, isDarkMode ? styles.darkModeInput : styles.lightModeInput]}
        placeholder="Search"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      {renderList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    padding: 10,
    marginBottom: 5,
  },
  itemText: {
    color: 'black',
  },
  searchInput: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: 'yellow',
  },
  darkModeBackground: {
    backgroundColor: '#222',
  },
  lightModeBackground: {
    backgroundColor: '#fff',
  },
  darkModeInput: {
    color: '#fff',
    backgroundColor: '#444',
  },
  lightModeInput: {
    color: '#000',
    backgroundColor: '#eee',
  },
  darkMode: {
    backgroundColor: '#333',
  },
  lightMode: {
    backgroundColor: '#f5f5f5',
  },
  darkModeText: {
    color: '#fff',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 20,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatList: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
});

export default MainPage;
