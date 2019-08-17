import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Common from '../common/Common'
import { getRandomInt } from '../../until/until';

const Review = (props) => {
  const [state, setState] = useState({
    musicAndSingerName: '',
    content: 'loading...',
    nickname: '',
    origin: '',
  });

  const fetchData = async () => {
    try {
      // 获取推荐歌单列表
      const {data: { result }} = await axios({
        method: 'get',
        url: 'https://music.aityp.com/personalized'
      });
      // 随机取其中一个歌单
      // playListId(歌单 id)
      const { id: playListId } = result[getRandomInt(0, result.length-1)];

      // 获取歌单详细信息
      const { data: {playlist: { tracks }} } = await axios({
        method: 'get',
        url: `https://music.aityp.com/playlist/detail?id=${playListId}`,
      });
      // 随机取歌单中的一首歌
      const { 
        // 歌曲 id
        id: musicId,
        // 歌名
        name: musicName,
        ar: [{
          // 歌手名字
          name: singerName
        }],
      } = tracks[getRandomInt(0, tracks.length-1)];

      // 获取歌曲评论
      const { data: { hotComments, comments } } = await axios({
        method: 'get',
        url: `https://music.aityp.com/comment/music?id=${musicId}&limit=1`,
      });
      // 随机取热评中的一条
      let oneOfComments = hotComments[getRandomInt(0, hotComments.length-1)];
      // 不存在热评，则取评论中的一条
      // 依然没有评论，报错并提示刷新
      !oneOfComments && (oneOfComments = comments[getRandomInt(0, comments.length-1)]);
      // // content(评论) nickname(用户名)
      const { content, user: { nickname } } = oneOfComments;
      
      setState({
        musicAndSingerName: `《${musicName}》——${singerName}`,
        content: content,
        nickname: `@${nickname}`,
        origin: '来源: 网易云音乐',
      });
    } catch (e) {
      setState({
        musicAndSingerName: '',
        content: '加载出错，可尝试下拉刷新',
        nickname: '',
        origin: '',
      });
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const {  musicAndSingerName, content, nickname, origin } = state;
  return (
    <Common
    {...props}
    headName='乐评'
    headColor={fontColor}
    bgColor='#3b465c'
    fetchData={fetchData}
    >
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.attachInfo}>{nickname}</Text>
      <Text style={styles.attachInfo}>{musicAndSingerName}</Text>
      <Text style={styles.attachInfo}>{origin}</Text>
    </Common>
  );
}

const fontColor = '#e9e8d4';
const styles = StyleSheet.create({
  content: {
    lineHeight: 23,
    color: fontColor,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  attachInfo: {
    lineHeight: 21,
    marginTop: 10,
    color: fontColor,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Review;