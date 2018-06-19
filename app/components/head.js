import React from 'react';
import './head.scss'

class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            song: '',
            singer: ''
        }
    }


    render(){
        return(
            <div className="head-component">
               <h2 className="title">播放列表</h2>
                <input
                    type="text"
                    placeholder="请输入歌曲名字"
                    className="input-song"
                    value={this.state.song}
                    onChange={(e) => {
                        this.setState({
                            song: e.target.value
                        })
                    }}
                />
                <input
                    type="text"
                    placeholder="请输入歌手名字"
                    className="input-singer"
                    value={this.state.singer}
                    onChange={(e) => {
                        this.setState({
                            singer: e.target.value
                        })
                    }}
                />
                <input
                    type="button"
                    value="添加音乐"
                    className="add-music-btn"
                    onClick={() => {
                        this.props.add(this.state.song, this.state.singer);
                        this.state = {
                            song: '',
                            singer: ''
                        }
                    }}/>
            </div>
        )
    }
}

export default Head;