/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import FaceTec, { FaceTecUxEvent, FaceTecSDKStatus, FaceTecSessionStatus } from 'react-native-facetec';
import Config from 'react-native-config'

const {
  REACT_APP_ZOOM_ENCRYPTION_KEY,
  REACT_APP_ZOOM_LICENSE_KEY,
  REACT_APP_ZOOM_LICENSE_TEXT,
  REACT_APP_SERVER_URL = 'http://localhost:3003',
  REACT_APP_SERVER_TOKEN,
  REACT_APP_ENROLLMENT_IDENTIFIER,
} = Config

export default function App () {
  const [status, setStatus] = useState('initializing')
  const [verified, setVerified] = useState('not verified')

  const onPressVerify = useCallback(async () => {
    try {
      await FaceTec.sdk.enroll(REACT_APP_ENROLLMENT_IDENTIFIER, 3, 60000)

      setVerified('verified')
    } catch (e) {
      setVerified('failed')
      console.log(e)
    }
  }, [setVerified])

  useEffect(() => {
    const initialize = async () => {
      try {
        await FaceTec.sdk.initialize(
          REACT_APP_SERVER_URL,
          REACT_APP_SERVER_TOKEN,
          REACT_APP_ZOOM_LICENSE_KEY,
          REACT_APP_ZOOM_ENCRYPTION_KEY,
          REACT_APP_ZOOM_LICENSE_TEXT
        )

        setStatus('initialized')
      } catch (e) {
        setStatus('initialization failed')
        console.error(e)
      }
    }

    initialize()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>☆FaceTec example☆</Text>
      <Text style={styles.instructions}>STATUS: {status}</Text>
      {'initialized' === status && (<>
        <Button onPress={onPressVerify} title="Verify me!" />
        <Text style={styles.instructions}>VERIFICATION: {verified}</Text>
      </>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
