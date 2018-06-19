// 包含所有的组件
import React from 'react';
import Header from './components/header';
import Player from './page/player';
import { MUSIC_LIST }  from './config/musiclist';
import Demo from './page/demo'
import Music from './page/music'

import Pubsub from 'pubsub-js'

class App extends React.Component{
    constructor(props){ // 初始化数据
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0],  // 当前正在播放的音乐,默认是第一个音乐
            isPlay: true,
            musicList: MUSIC_LIST
        }
    }

    playMusic(musicItem){
        $("#player").jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    }

    // 播放下首音乐
    playNext(type='next'){
        // 获取当前播放音乐的下标
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length

        if(type === 'next'){
            newIndex = (index + 1) % musicListLength;
        }else {
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex])

    }

    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }

    // 组件挂载完毕
    componentDidMount(){
        // 初始化音频并且播放
        $("#player").jPlayer({
            supplied:'mp3',
            wmode: 'window'
        })

        // this.playMusic(this.state.currentMusicItem)

        // 订阅播放音乐的事件
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        })

        // 订阅删除音乐的事件
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({  // 过滤掉音乐列表, 删除当下的歌曲，返回不是当前的歌曲
                musicList: this.state.musicList.filter((item) => {
                    return item != musicItem
                })
            })
        })

        // 订阅上一首
        Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
            this.playNext('prev')
        })

        // 订阅下一首
        Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
            this.playNext('next')
        })

        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playNext();
        })

    }

    componentWillUnMount(){
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
    }

    render(){
        return(
            <div>
                <Music />
                {/*<Demo />*/}
                {/*<Header />*/}
                {/*<Player*/}
                {/*currentMusicItem={this.state.currentMusicItem}*/}
                {/*>*/}

                {/*</Player>*/}

                {/*<MusicList*/}
                {/*currentMusicItem={this.state.currentMusicItem}*/}
                {/*musicList={this.state.musicList}*/}
                {/*>*/}
 
                {/*</MusicList>*/}
            </div>
        )
    }
}

class Root extends React.Component{
    render(){
        return(
            <div>
                <App/>
            </div>
        )
    }
}

export default Root;


