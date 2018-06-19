// 包含所有的组件
import React from 'react';
import './play.scss';
import Progress from '../components/progress';
import Pubsub from 'pubsub-js'

let duration = null;  // 音乐的总时间
class Player extends React.Component{
    constructor(props){ // 初始化数据
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: null
        }
    }

    // 播放上一首
    playPrev(){
        Pubsub.publish(('PLAY_PREV'))
    }

    // 播放下一首
    playNext(){
        Pubsub.publish(('PLAY_NEXT'))
    }

    formatTime(time){
        time = Math.floor(time);
        let minutes = Math.floor((time / 60));
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`
    }

    // 组件挂载完毕
    componentDidMount(){
        // 动态监听音频的播放进度, 实时更新进度progress
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume:  e.jPlayer.options.volume * 100,
                // leftTime: duration * (1- e.jPlayer.status.currentPercentAbsolute)    //总时间 * 剩余的百分比
                leftTime: this.formatTime(duration * (1- e.jPlayer.status.currentPercentAbsolute / 100))
            })

            // 屏蔽声音
            $("#player").jPlayer('volume', 0) ;
        })
    }

    // 播放器解绑
    componentWillUnMount(){
        $('#player').unbind($.jPlayer.event.timeupdate)
    }

    // 父组件自定义事件
    changeProgresHandler(progress){// 参数progress是从子组件传递过来的
        $("#player").jPlayer('play', duration * progress) ; // 设置音乐的播放进度
    }

    // 改变音乐的音量
    changeVolumeHandler(progress){
        $("#player").jPlayer('volume', progress) ;
    }

    // 播放音乐
    play(){
        if( this.state.isPlay ){ // 如果在播放，点击的时候就暂停
            $("#player").jPlayer('pause') ;
        }else {
            $("#player").jPlayer('play') ;
        }

        // 给变量取反
        this.state.isPlay = !this.state.isPlay;
    }

    render(){
        return(
            <div className="play-page">
                <div className="left-page">
                    <h1 className="caption">我的私人音乐坊</h1>
                    <div className="mt20">
                        <div className="controll-wrapper">
                            <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                            <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                            <div className="mt20 row">
                                <div className="left-title">{this.state.leftTime}</div>
                                <div className="volume-container">
                                    <i className="icon-value" style={{
                                        top: 5,
                                    }}>

                                    </i>
                                    <div className="volume-wrapper">
                                        <Progress
                                            progress={this.state.volume}
                                            bgColor="#aaa"
                                            onProgressChange={this.changeVolumeHandler}
                                        >

                                        </Progress>
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 10, lineHeight: '10px', fontSize: '12px'}}>
                                <Progress
                                    progress={this.state.progress}
                                    bgColor="green"
                                    onProgressChange={this.changeProgresHandler}
                                >

                                </Progress>
                            </div>
                            <div className="row mt35">
                                <div className="music-controler">
                                    <i className="icon prev" onClick={() => this.playPrev()}></i>
                                    <i className={`icon ml20  ${this.state.isPlay ? 'play' : 'pause'}`} onClick={() => this.play()}></i>
                                    <i className="icon ml20 next" onClick={() => this.playNext()}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-page">
                    <img src={require('../../static/images/on.png')} alt=""/>
                    <div className="cover-page">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;


