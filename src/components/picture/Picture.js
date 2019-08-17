import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import Common from '../common/Common';

const Picture = (props) => {
  const [copyright, setCopyright] = useState('loading...');
  const [source, setSource] = useState(' ');

  const fetchData = async () => {
    try {
      let { data: { images } } = await axios({
        method: 'get',
        url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
      });

      const { copyright, url } = images[0];
      setSource(`https://cn.bing.com/${url}`);
      setCopyright(copyright);
    } catch (e) {
      setCopyright('加载出错，可尝试下拉刷新');
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Common  
      {...props}
      headName='图片'
      headColor={fontColor}
      bgColor='#e88565'
      fetchData={fetchData}
    >
      <Image 
        style={pStyles.image}
        source={{uri: source}}
      />
      <Text style={pStyles.text}>{copyright}</Text>
    </Common>
  );
}

const { width: winWidth } = Dimensions.get('window');
const fontColor = '#181a27';
const pStyles = StyleSheet.create({
  image: {
    width: winWidth - 20, 
    height: (winWidth - 20)/1.7,
  },
  text: {
    lineHeight: 23,
    fontSize: 18,
    color: fontColor,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Picture;