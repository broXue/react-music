import React from 'react';
import './progress.scss';

class Progress extends React.Component{
    constructor(props){
        super(props);
    }
    changeProgress(e){
        let progressBar = this.refs.progressBar; // 先获取进度条的元素
        let progress = ( e.clientX - progressBar.getBoundingClientRect().left ) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress)
    }

    render(){
        return(
            <div className="components-progress" ref="progressBar"
                 onClick={(e) => this.changeProgress(e)}>
                <div className="progress" style={{
                    width: `${this.props.progress}%`,
                    background: this.props.bgColor
                }}>

                </div>
            </div>
        )
    }
}

export default Progress;