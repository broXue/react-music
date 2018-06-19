import React from 'react';
import './footer.scss'

class Footer extends React.Component{
    render(){
        let dataLength = this.props.dataLength;
        let selectedDataLength = this.props.selectedDataLength;
        let likedDataLength = this.props.likedData;
        let listState = this.props.listState;


        return(
            <footer
                style={{
                    display: dataLength ? 'inline-block' : 'none'
                }}
            >
                <div className="info">
                    <span
                        style={{
                            display: dataLength ? 'inline-block' : 'none'
                        }}
                    >共{dataLength}首歌曲</span>
                    <span
                        className="align-right"
                        style={{
                            display: selectedDataLength ? 'inline-block' : 'none'
                        }}
                    >当前选中的{selectedDataLength}首歌曲</span>
                </div>
                <input
                    type="button"
                    value="删除选中的歌曲"
                    style={{
                        display: selectedDataLength ? 'inline-block' : 'none'
                    }}
                    onClick={ () => {
                        this.props.deleteSelectedItem()
                    }}
                />
                <input
                    type="button"
                    value="收藏选中的歌曲"
                    style={{
                        display: selectedDataLength ? 'inline-block' : 'none'
                    }}
                />
                <input
                    type="button"
                    value="取消收藏选中的歌曲"
                    style={{
                        display: selectedDataLength ? 'inline-block' : 'none'
                    }}
                />
                <input
                    type="button"
                    value="查看收藏清单"
                    style={{
                        display: (listState && likedDataLength) ? 'inline-block' : 'none'
                    }}
                />
                <input
                    type="button"
                    value="查看所有清单"
                    style={{
                        display: !listState ? 'inline-block' : 'none'
                    }}
                />
            </footer>
        )
    }
}

export default Footer;