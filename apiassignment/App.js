import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';

export default function App() {

  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDog = () => {
    setLoading(true);

    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": ""
    });

    var request = {
      method: 'GET',
      headers: headers
    };

    fetch('https://api.thedogapi.com/v1/images/search?&has_breeds=true', request)
      .then((response) => response.json())
      .then((data) => {
        if(data.length > 0) {
          const dogData = {
            imageUrl: data[0].url,
            breed: data[0].breeds?.[0]?.name || 'Unknown Breed',
            temperament: data[0].breeds?.[0]?.temperament || 'No temperament data'
          };
          setDog(dogData);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDog();
  }, []);
    

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : dog ? (
        <>
          <Text style={styles.text}>Get some dog facts</Text>
          <Image source={{ uri: dog.imageUrl }} style={styles.image}/>
          <Text style={styles.text}>Breed: {dog.breed}</Text>
          <Text style={styles.text}>Temperament: {dog.temperament}</Text>
          
          <TouchableOpacity style={styles.button} onPress={fetchDog}>
            <Text style={styles.buttonText}>More cuteness</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No data available</Text>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#F8BBD0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#F06292',
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
