import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Image, 
  Linking,
  Alert,
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Common from '../common/Common'
import { getRandomInt } from '../../until/until';

const Review = (props) => {
  const [state, setState] = useState({
    imageSource: ' ',
    content: 'loading...',
    // 知乎日报文章 id
    id: ''
  });

  const fetchData = async () => {
    try {
      const { data: { stories, top_stories } } = await axios({
        method: 'get',
        url: 'https://news-at.zhihu.com/api/4/news/latest',
      });
      const res = [...stories, ...top_stories];
      const { images, title, image, id } = res[getRandomInt(0, res.length-1)];
    
      setState({
        imageSource: !!images ? images[0] : image,
        content: title,
        id: id
      });
    } catch (e) {
      setState({
        imageSource: ' ',
        content: '加载出错，可尝试下拉刷新',
        id: ''
      });
      console.log(e);
    }
  }

  // 弹出错误
  const alertError = () => {
    Alert.alert(
      'Error:',
      '权限不足，无法调起浏览器。',
      [
        {text: 'OK'},
      ],
      { cancelable: false }
    )
  }
  
  // 跳转浏览器
  const jumpBrowser = () => {
    const url = `https://daily.zhihu.com/story/${id}`
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        alertError();
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => {
      alertError();
      console.error('An error occurred', err);
    });
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const { content, imageSource, id } = state;
  return (
    <Common
    {...props}
    headName='日报'
    headColor={fontColor}
    bgColor='#0084ff'
    fetchData={fetchData}
    >
      <Image 
        source={{uri: imageSource}}
        style={styles.image}
      />
      <Text style={styles.content}>{content}</Text>
      <Text 
        style={[styles.attachInfo, {borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'black'}]}
        onPress={jumpBrowser}
      >
        <Icon color={fontColor} size={18} name='link'/>
        {` 可点击此处@知乎日报`}
      </Text>
    </Common>
  );
}

const fontColor = '#ffffff';
const styles = StyleSheet.create({
  image: {
    height: 200, 
    width: 200, 
    margin: 10,},
  content: {
    lineHeight: 23,
    color: fontColor,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  attachInfo: {
    lineHeight: 20,
    marginTop: 10,
    color: fontColor,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Review;