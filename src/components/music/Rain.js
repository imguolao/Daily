import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, 
  Image,
  View,
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Video from 'react-native-video';
import Common from '../common/Common'
import { getRandomInt } from '../../until/until';

// 雨声歌单列表(@网易云音乐)
const rainList = ['368095995', '457121054',  '409974316', '2240244814', '544498589'];

const Rain = (props) => {
  const [state, setState] = useState({
    loading: true,
    isPlaying: false,
    musicSource: '',
    imageSource: ' ',
    musicName: '',
  });
  const musicPlayer = useRef(null);

  const fetchData = async () => {
    setState((preState) => {
      return {...preState, loading: true, isPlaying: false,};
    })
    try {
      for(let i=0; i<10; i++) {
        // 获取歌单详细信息
        const { data: {playlist: { tracks }} } = await axios({
          method: 'get',
          url: `https://music.aityp.com/playlist/detail?id=${rainList[0, rainList.length-1]}`,
        });
        // 随机取歌单中的一首歌
        const { 
          // 歌曲 id
          id: musicId,
          // 歌名
          name: musicName,
          al: {
            // 图片
            picUrl: imageSource,
          }
        } = tracks[getRandomInt(0, tracks.length-1)];

        // 查询音乐是否可用
        const { data: { success } } = await axios({
          method: 'get',
          url: `https://music.aityp.com/check/music?id=${musicId}`,
        });

        if (success) {
          const { data: {data: [{url: musicSource}]} } = await axios({
            method: 'get',
            url: `https://music.aityp.com/song/url?id=${musicId}`,
          });

          // 仅支持 mp3
          if (!/mp3/g.test(musicSource)) continue;
          
          setState((preState) => {
            return {
              ...preState,
              loading: false,
              isPlaying: false,
              musicName: musicName,
              imageSource: imageSource,
              musicSource: musicSource,
            };
          });

          // 退出
          return;
        }
      }
      // 报错进入 catch
      throw new Error('err: load error.');
    } catch (e) {
      setState((preState) => {
        return {
          ...preState,
          musicName: '加载出错，尝试下拉刷新',
        };
      });
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const playVideo = () => {
    setState((preState)=> {
      return {...preState, isPlaying: true};
    });
  }

  const pauseVideo = () => {
    setState((preState)=> {
      return {...preState, isPlaying: false};
    });
  }

  return (
    <Common
    {...props}
    headName='听雨'
    headColor={fontColor}
    bgColor='#32B67A'
    fetchData={fetchData}
    >
      {
        state.loading 
        ?
        null
        :
        <Video 
          ref={musicPlayer}
          source={{uri: state.musicSource}}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={!state.isPlaying}
          // 确定应用程序在后台时是否应继续播放媒体
          playInBackground={true}
          progressUpdateInterval={250.0}
          // 重复播放
          repeat={true}
          style={{width: 0, height: 0}}
        />
      }
      {
        state.loading 
        ?
        null
        :
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Image 
            source={{uri: state.imageSource}}
            style={{height: 200, width: 300}}
          />
          {
            state.isPlaying
            ?
            <TouchableOpacity
              onPress={pauseVideo}
              style={styles.button}
            >
              <Icon name='pause' color={fontColor} size={30} />
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={playVideo}
              style={styles.button}
            >
              <Icon name='play' color={fontColor} size={30} />
            </TouchableOpacity>
          }
          <Text style={styles.info}>{state.musicName}</Text>
        </View>
      }
    </Common>
  );
}

const fontColor = '#333';
const styles = StyleSheet.create({
  info: {
    lineHeight: 21,
    marginTop: 10,
    color: fontColor,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default Rain;