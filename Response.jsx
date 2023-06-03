import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text, 
  View, 
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert} from 'react-native';


  export const response = () => {

    return(
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
    )
  }