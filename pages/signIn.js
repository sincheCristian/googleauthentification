import React, { useState } from 'react';
import {Alert, Text,ImageBackground, View,StyleSheet,TouchableOpacity} from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import MyButton from '../components/myButton';
import MyTextInput from '../components/myTextInput';



const HelloWorldApp = ({route,navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    if(email!= "" && password!==""){
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const userId = userCredential.user.uid;
          console.log("ID de l'utilisateur connecté :", userId);            
            const userInfo = {
              uname: '',
              adresse: email,
              uid: userId,
              image: '',
            };
            const userDoc = firestore().collection('users').doc(userId);
            await userDoc.set(
              {
                isConnected: true,
              },
              { merge: true }
            );  

            navigation.navigate('Home')
   
        })
        .catch((error) => {
          // Gérer les erreurs possibles
          if (error.code === 'auth/user-not-found') {
            Alert.alert('Vous n\'êtes pas enregistré, veuillez le faire !');
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Mot de passe incorrect !');
          } else {
            Alert.alert('Une erreur est survenue. Veuillez réessayer.');
          }
          console.error(error);
        });
      }else{
        Alert.alert('Veillez entrer vos informations de connexion Merci.');
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
      <MyButton title="se connecter" onPress={signIn} /> 

  <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
    <Text style={styles.linkText}>Inscrivez-vous ici</Text>
  </TouchableOpacity>

    </View>    
  );
};
export default HelloWorldApp

const styles = StyleSheet.create({
  linkText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
    marginVertical:10,
  },
});
