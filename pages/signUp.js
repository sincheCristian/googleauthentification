import React, { useState } from 'react';
import {Alert, Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import MyButton from '../components/myButton';
import MyTextInput from '../components/myTextInput';



const HelloWorldApp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async () => {
    if (email !== '' && password !== '' && confirmPassword !== '') { 
      if (password !== confirmPassword) {
        Alert.alert('Les mots de passe ne correspondent pas');
        return;
      }
      try {        
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;
        console.log('User UID:', uid);
        Alert.alert('Utilisateur créé');

        // Enregistre les informations de l'utilisateur dans Firestore
        const userDoc = firestore().collection('users').doc(uid);
        await userDoc.set({
          id: uid,
          name: '', // Nom vide pour l'instant
          image: '', // Image vide pour l'instant
          email: email,
          isConnected: true, // Marquer comme actif
        }, { merge: true });

        Alert.alert('Création réussie avec succès');
      } catch (err) {
        Alert.alert('Erreur lors de la création :', err.message);
      }
    } else {
      Alert.alert('Veuillez entrer toutes les informations');
    }
  };
  console.log(email + '\n' + password);
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : '#FFFFFF'
    }}>      
     <MyTextInput
        value={email} 
        onChangeText={Text => setEmail(Text)} 
        placeholder="Entrez votre email" 
        placeholderTextColor="#515066"
        keyboardType="email-address" 
      />
      <MyTextInput 
        value={password} 
        onChangeText={Text => setPassword(Text)} 
        placeholder="Entrez votre mot de passe" 
        placeholderTextColor="#515066"
        secureTextEntry
      />
      <MyTextInput 
        value={confirmPassword} 
        onChangeText={Text => setConfirmPassword(Text)} 
        placeholder="Confirmez votre mot de passe" 
        placeholderTextColor="#515066"
        secureTextEntry
      />
      <MyButton title="S'enregistrer" onPress={signUp} />
      <Text>i have a account </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('signIn');
        }}
      >
        <Text 
        style={{ 
          color: '#4A90E2',
          fontWeight: 'bold',
          marginLeft: 5,
          fontSize: 16,
          marginVertical:10,
           }}>signIn</Text>
      </TouchableOpacity>

      
    </View>
  );
};



export default HelloWorldApp

