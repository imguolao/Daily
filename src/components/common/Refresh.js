import React, { useState } from 'react';
import { ScrollView, RefreshControl, } from 'react-native';

const Refresh = ({fetchData, bgColor, children}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(()=>setRefreshing(false));
  }

  return (
    <ScrollView
      contentContainerStyle={{flex: 1, justifyContent: 'flex-start', backgroundColor: bgColor}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {children}
    </ScrollView>
  );
}

export default Refresh;