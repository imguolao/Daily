import React from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Refresh from './Refresh';

const Common = (props) => {
  const { 
    headName, 
    headColor, 
    bgColor,
    fetchData,
    children, 
    navigation: { openDrawer }
  } = props;

  return (
    <Refresh
      fetchData={fetchData}
      bgColor={bgColor}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => openDrawer()}
          style={{paddingTop: 5}}
        >
          <Icon name='bars' size={28} color={headColor} back/>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: headColor}}>{headName}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </Refresh>
  )
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
  },
  content: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 40,
  },
});

export default Common;