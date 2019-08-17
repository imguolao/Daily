import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import Common from '../common/Common';

const Saying = (props) => {
  const [state, setState] = useState({
    content: 'loading...',
    from: '',
  });

  const fetchData = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'https://v1.hitokoto.cn/'
      });

      const {data: { hitokoto, from }} = res;
      setState({
        content: hitokoto,
        from: `——${from}`,
      });
    } catch (e) {
      setState((preState) => {
        return {...preState, content: '加载出错，可尝试下拉刷新'};
      });
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { content, from } = state;
  return (
    <Common
    {...props}
    headName='言语'
    headColor={fontColor}
    bgColor='#4d3940'
    fetchData={fetchData}
    >
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.day}>{from}</Text>
    </Common>
  );
}

const fontColor = '#bbab9b';
const styles = StyleSheet.create({
  content: {
    lineHeight: 25,
    color: fontColor,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  day: {
    marginTop: 10,
    color: fontColor,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Saying;