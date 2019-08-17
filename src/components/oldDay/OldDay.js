import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Common from '../common/Common'
import { getRandomInt } from '../../until/until';

const OldDay = (props) => {
  const [state, setState] = useState({
    content: 'loading...',
    day: '',
  });

  const fetchData = async () => {
    try {
      const {data: { content }} = await axios({
        method: 'get',
        url: 'https://api.ooopn.com/history/api.php?type=json'
      });

      setState({
        content: content[getRandomInt(0, content.length-1)],
        day: '历史上的今天',
      });
    } catch (e) {
      setState({
        content: '加载出错,可尝试下拉刷新',
        day: '',
      });
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { content, day } = state;
  return (
    <Common
    {...props}
    headName='昔日'
    headColor={fontColor}
    bgColor='#1f3b34'
    fetchData={fetchData}
    >
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.day}>{day}</Text>
    </Common>
  );
}

const fontColor = '#ffbc00';
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

export default OldDay;