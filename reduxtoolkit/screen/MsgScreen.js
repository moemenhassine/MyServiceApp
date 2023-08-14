import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'

const MsgScreen = () => {
  return (
    <ScrollView>
      <View style={styles.head}>
        <Text style={styles.texthead}>Message</Text>
      </View>
      
     
    </ScrollView>
  )
}

export default MsgScreen

const styles = StyleSheet.create({
  head:{
    backgroundColor:"gray"
  },
  texthead: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 60,
    marginBottom: 15
    
  },
})