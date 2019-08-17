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

const MusicPlayer = (props) => {
  const [state, setState] = useState({
    loading: true,
    isPlaying: false,
    // currentTime: 0, // 当前播放时间
    musicSource: '',
    imageSource: '',
    singerName: '',
    musicName: '',
  });
  const musicPlayer = useRef(null);

  const fetchData = async () => {
    setState((preState) => {
      return {...preState, loading: true,};
    });

    try {
      // 获取推荐歌单列表
      const {data: { result }} = await axios({
        method: 'get',
        url: 'https://music.aityp.com/personalized'
      });

      for (let i=0; i<10; i++) {
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
          al: {
            // 图片
            picUrl: imageSource,
          },
          ar: [{
            // 歌手名字
            name: singerName
          }],
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
              singerName: singerName,
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

  const _onEnd = () => {
    console.log('结束')
    setState((preState) => {
      return {...preState, isPlaying: false};
    })
  }

  const _onLoadStart = () => {
    console.log('开始加载');
  };
  
  const _onBuffering = () => {
    console.log('缓冲中...')
  };
  
  const _onLoaded = (data) => {
    console.log('加载完成');
  };
  
  const _onProgressChanged = (data) => {
    console.log('进度更新');
  };
  
  const _onPlayError = () => {
    console.log('播放失败');

  };

  return (
    <Common
    {...props}
    headName='音乐'
    headColor={fontColor}
    bgColor='#C20C0C'
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
          // 播放结束
          onEnd={_onEnd}
          onLoadStart={this._onLoadStart}
          onLoad={_onLoaded}
          onProgress={_onProgressChanged}
          onError={_onPlayError}
          onBuffer={_onBuffering}
          progressUpdateInterval={250.0}
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
          <Text style={styles.info}>{state.singerName}</Text>
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

export default MusicPlayer;