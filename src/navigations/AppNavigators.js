import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  DrawerItems, 
  SafeAreaView
} from 'react-navigation';
import Verse from '../components/verse/Verse';
import Picture from '../components/picture/Picture';
import OldDay from '../components/oldDay/OldDay';
import Saying from '../components/saying/Saying';
import Review from '../components/music/Review';
import Daily from '../components/daily/Daily';
import MusicPlayer from '../components/music/MusicPlayer';
import Rain from '../components/music/Rain';

const BottomNav = createAppContainer(
  createMaterialTopTabNavigator({
    Picture: {
      screen: Picture,
      navigationOptions: {
        tabBarlabel: 'Picture',
        tabBarVisible: false,
      },
    },
    Verse: {
      screen: Verse,
      navigationOptions: {
        tabBarlabel: 'Verse',
        tabBarVisible: false,
      },
    },
    Saying: {
      screen: Saying,
      navigationOptions: {
        tabBarlabel: 'Saying',
        tabBarVisible: false,
      },
    },
    MusicPlayer: {
      screen: MusicPlayer,
      navigationOptions: {
        tabBarlabel: 'MusicPlayer',
        tabBarVisible: false,
      },
    },
    Review: {
      screen: Review,
      navigationOptions: {
        tabBarlabel: 'Review',
        tabBarVisible: false,
      },
    },
    Rain: {
      screen: Rain,
      navigationOptions: {
        tabBarlabel: 'Rain',
        tabBarVisible: false,
      },
    },
    Daily: {
      screen: Daily,
      navigationOptions: {
        tabBarlabel: 'Daily',
        tabBarVisible: false,
      },
    },
    OldDay: {
      screen: OldDay,
      navigationOptions: {
        tabBarlabel: 'OldDay',
        tabBarVisible: false,
      },
    },
  }, {
    // 左右滑动切换页面
    swipeEnabled: true,
    // 切换页面时启用动画
    animationEnabled: true,
    // tabBar 放在底下
    tabBarPosition: 'bottom',
    // 隐藏 Label
    showLabel: false,
    // 懒加载
    // lazy: true,
    backBehavior: 'order',
    // tabBarOptions: {
    //   upperCaseLabel: false,
    //   style: {
    //     backgroundColor: 'white',
    //   },
    //   indicatorStyle: {
    //     height: 2,
    //     backgroundColor: '#000',
    //   },
    //   labelStyle: {
    //     fontSize: 14,
    //     marginTop: 6,
    //     marginBottom: 6
    //   },
    // },
  })
);
// BottomNav = createAppContainer(BottomNav);

let DrawerNav = createDrawerNavigator({
  BottomNav: {
    screen: BottomNav,
    navigationOptions: {
      drawerLabel: () => {
        return (<View style={{opacity: 0}}></View>);
      },
    },
  },
  Picture: {
    screen: Picture,
    navigationOptions: {
      drawerLabel: '图片',
    },
  },
  Verse: {
    screen: Verse,
    navigationOptions: {
      drawerLabel: '诗句'
    },
  },
  Saying: {
    screen: Saying,
    navigationOptions: {
      drawerLabel: '言语'
    },
  },
  MusicPlayer: {
    screen: MusicPlayer,
    navigationOptions: {
      drawerLabel: '音乐'
    },
  },
  Review: {
    screen: Review,
    navigationOptions: {
      drawerLabel: '乐评'
    },
  },
  Rain: {
    screen: Rain,
    navigationOptions: {
      drawerLabel: '听雨'
    },
  },
  Daily: {
    screen: Daily,
    navigationOptions: {
      drawerLabel: '日报'
    },
  },
  OldDay: {
    screen: OldDay,
    navigationOptions: {
      drawerLabel: '昔日'
    },
  },
}, {
  initialRouteName: 'BottomNav',
  // drawerType: 'slide',
  contentOptions: {
    labelStyle: {
      fontSize: 16,
      marginLeft: 20,
    }
  },
  contentComponent:(props) => {
    return (
      <ScrollView style={{flex:1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{height: 140, backgroundColor: '#293571', justifyContent: 'center', flex: 1}}>
            <Text style={{marginLeft: 20, fontSize: 25, color: '#fff'}}>Daily</Text>
          </View>
          <DrawerItems 
            {...props} 
            onItemPress={({route})=>{
              props.navigation.closeDrawer(); 
              props.navigation.navigate(route.routeName);
            }}
          />
        </SafeAreaView>
      </ScrollView>
    );
  },
});
DrawerNav = createAppContainer(DrawerNav);

export default DrawerNav;