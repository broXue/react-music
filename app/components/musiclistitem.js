import React from 'react';
import './musiclistitem.scss';
import Pubsub from 'pubsub-js'

class MusicListItem extends React.Component{
    constructor(props){
        super(props)
    }
    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC', musicItem)
    }
    deleteMusic(musicItem, e){
        e.stopPropagation()
        Pubsub.publish('DELETE_MUSIC', musicItem)
    }
    render(){
        let musicItem = this.props.musicItem
        return(
            <li className="components-musiclistitem">
                <p className={`music-cont ${this.props.focus ? 'focus' : ''}`} onClick={() => this.playMusic(musicItem)}>
                    <strong>{musicItem.title}</strong>
                    -{musicItem.artist}
                </p>
                <p className="delete" onClick={(e) => this.deleteMusic(musicItem, e)}></p>
            </li>
        )
    }

}

export default MusicListItem;