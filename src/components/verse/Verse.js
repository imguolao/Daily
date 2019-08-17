import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, } from 'react-native';
import axios from 'axios';
import Common from '../common/Common';

const Verse = (props) => {
  const [state, setState] = useState({
    content: 'loading...',
    authorAndOrigin: '',
  });

  const fetchData = async () => {
    try {
      const { data: {content, origin, author } } = await axios({
        method: 'get',
        url: 'https://api.gushi.ci/all.json'
      });

      setState({
        content: content,
        authorAndOrigin: `——${author}(${origin})`,
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
  }, [])
  
  const { content, authorAndOrigin } = state;
  return (
    <Common
      {...props}
      fetchData={fetchData}
      headName='诗句' 
      headColor={fontColor} 
      bgColor='#f1c3b8'
    >
      <Text style={vStyles.content}>{content}</Text>
      <Text style={vStyles.author}>{authorAndOrigin}</Text>
    </Common>
  )
}

const fontColor = '#19227d';
const vStyles = StyleSheet.create({
  content: {
    fontSize: 20,
    lineHeight: 25,
    color: fontColor,
    paddingLeft: 10,
    paddingRight: 10,
  },
  author: {
    lineHeight: 22,
    fontSize: 18,
    color: fontColor,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default Verse;