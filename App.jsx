import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text, 
  View, 
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Feather, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {BASE_URL} from '@env'
import axios from 'axios';

const data = [
  { label: 'Verão', value: '1' },
  { label: 'Outono', value: '2' },
  { label: 'Inverno', value: '3' },
  { label: 'Primavera', value: '4' },
];

export const App = () => {
  const [estadoData, setEstadoData] = useState([]);
  const [cidadeData, setCidadeData] = useState([]);
  const [estado, setEstado] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [estacao, setEstacao] = useState(null);
  const [estacaoNome, setEstacaoNome] = useState(null)
  const [estadoNome, setEstadoNome] = useState(null);
  const [cidadeNome, setCidadeNome] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [userName, setUserName] = useState('');
  const [metros, setMetros] = useState('');


  useEffect(() => {
    var config = {
      method: 'get',
      url: `${BASE_URL}estados`,
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let estadoArray = [];
      for (var i = 0; i < count; i++ ) {
        estadoArray.push({
          value: response.data[i].sigla,
          label: response.data[i].nome,
        })
      }
      setEstadoData(estadoArray)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
 
  const handleCidade = (UF) => {
    var config = {
      method: 'get',
      url: `${BASE_URL}estados/${UF}/municipios`,
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      var count = Object.keys(response.data).length;
      let cidadeArray = [];
      for (var i = 0; i < count; i++ ) {
        cidadeArray.push({
          value: response.data[i].sigla,
          label: response.data[i].nome,
        })
      }
      setCidadeData(cidadeArray)
    })
    .catch(function (error) {
      console.log(error);r
    });
  }

  return (

    <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
      <View style={styles.container}>
        
        <View style={styles.title}>
          <Text style={styles.textSize}>GreenField</Text>
        </View>

        <View style={[styles.inputView, isFocus && { borderColor: '#228B22'} ]}>
        <Feather 
          name="user" 
          size={24} 
          color="black" />
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome'
            placeholderTextColor='#000'
            value={userName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={e => {
              setUserName(e.nativeEvent.text)
              setIsFocus(false);
            }}
          />

        </View>


        <View style={[styles.inputView, isFocus && { borderColor: '#228B22'} ]}>
          <Ionicons 
            marginRight={5}
            name="leaf-outline" 
            size={24} 
            color="black" />
          <TextInput
            style={styles.input}
            placeholder='Digite o que irá plantar'
            placeholderTextColor='#000'
          />
        </View>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#228B22' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={estadoData}
          search
          maxHeight={250}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seu estado' : '...'}
          searchPlaceholder="Search..."
          value={estado}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setEstado(item.value);
            handleCidade(item.value)
            setEstadoNome(item.label) 
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons 
            style={styles.icon} 
            name="city-variant-outline" 
            size={24} 
            color="black" />
          )}
        />

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#228B22' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cidadeData}
          search
          maxHeight={250}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Sua cidade' : '...'}
          searchPlaceholder="Search..."
          value={cidade}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCidade(item.value);
            setCidadeNome(item.label)
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
            style={styles.icon} 
            name="sign-real-estate" 
            size={24} 
            color="black" />
          )}
        />

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#228B22' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Estação do ano' : '...'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setEstacao(item.value)
            setEstacaoNome(item.label)
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons 
            style={styles.icon}
            name="weather-partly-rainy" 
            size={24} 
            color="black" />
          )}
        />

        <View style={[styles.inputView, isFocus && { borderColor: '#228B22'} ]}>
        <Entypo 
        name="ruler" 
        size={24} 
        color="black" />
          <TextInput
            style={styles.input}
            placeholder='Espaço disponivel em m²'
            placeholderTextColor='#000'
            keyboardType='number-pad'
            value={metros}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={e => {
              setMetros(e.nativeEvent.text)
              setIsFocus(false);
            }}
          />
        </View>


        <View style={styles.viewPress}> 
        <TouchableOpacity 
        style={styles.press} 
        onPress={() => {
        if(!estadoNome || !cidadeNome || !estacaoNome || !userName) {
          Alert.alert("Por favor, preencha todos os campos.");
        } else {
          Alert.alert(`Estado: ${estadoNome}\nCidade: ${cidadeNome}
          Estação: ${estacaoNome}\nSeu nome: ${userName}\nMetros: ${metros}`);
    }
  }}
>
  <Text style={styles.textPrss}>Teste</Text>
</TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77DD77',
    padding: 20,
  },
  title:{
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70
  },
  textSize: {
    fontSize: 60,
    fontWeight: '200',
    letterSpacing: 5,
  },  
  dropdown: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#b9ffb99d',
    borderColor: '#424242',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputView:{
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#b9ffb99d',
    borderColor: '#424242',
    borderWidth: 2,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input:{
    fontSize: 16,
    marginLeft: 5
  },
  viewPress: {
    paddingTop: 55,
    alignItems: 'center',
  },
  press: {
    backgroundColor: '#424242',
    height: 70,
    width: 200,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textPrss: {
    color: '#9eff9e',
    fontSize: 25
  }
});