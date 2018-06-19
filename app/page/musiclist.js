import React from 'react';
import MusicListItem from '../components/musiclistitem'

class MusicList extends React.Component{
    render(){
        let listEle = null;  // 用于存储li的列表
        listEle = this.props.musicList.map((item, index) => {
            return <MusicListItem
                musicItem={item}
                key={index}
                focus={item === this.props.currentMusicItem}
            >

            </MusicListItem>
        })

        return(
            <ul>
                { listEle }
            </ul>
        )
    }
}

export default MusicList;