import React from 'react';
import Head from '../components/head';
import Main from '../components/main';
import Footer from '../components/footer';
import './music.scss'


class Music extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listState: true,   // 控制所有清单和收藏清单的显示隐藏
            data: [
                {
                    song : "千里之外",
                    singer : '周杰伦',
                    selected: true,
                    liked: false
                },
                {
                    song : "菊花台",
                    singer : '方文山',
                    selected: true,
                    liked: false
                },
                {
                    song : "以父之名",
                    singer : '黄俊郎',
                    selected: false,
                    liked: true
                },
                {
                    song : "听妈妈的话",
                    singer : 'Jay Chou',
                    selected: true,
                    liked: true
                },
            ]
        }
        this.add = this.add.bind(this);
        this.isCheckAll = this.isCheckAll.bind(this);
        this.setCheckAll = this.setCheckAll.bind(this);
        this.setCheck = this.setCheck.bind(this);
        this.setLike = this.setLike.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteSelectedItem = this.deleteSelectedItem.bind(this);
    }

    add(song, singer){
        // 获取当前的state下面的data
        let data = this.state.data;
        // 往data里面push数据
        data.push({
            song : song,
            singer : singer,
            selected: false,
            liked: false
        })
        // 更新state
        this.setState({
            data: data
        })
    }

    // 拿到原始数据, 判断是否全选
    isCheckAll(){// 返回全选为true，否则为false
        let data = this.state.data;
        for( let i = 0; i < data.length; i++ ){
            if( !data[i].selected ){
                return false
            }
        }
        return true;
    }

    // 全选或者不全选
    setCheckAll(checked){
        console.log(checked)
        // 处理data数据中的selected
        let data = this.state.data.map((val) => {
            if( checked ){ // 如果checked为true是全选，每个item的selected就为true
                val.selected = true;
                return val
            }else {
                val.selected = false;
                return val
            }
        })

        this.setState({
            data
        })
    }

    // 某一个选择或者不选择
    setCheck(index, checked){
        let data = this.state.data;
        data[index].selected = checked
        this.setState({
            data
        })
    }

    // 某一个收藏或者不收藏
    setLike(index, liked){
        let data = this.state.data;
        data[index].liked = liked
        this.setState({
            data
        })
    }

    // 删除item
    deleteItem(item, index){
        // this.setState({
        //     data: this.state.data.filter( (item1) => {
        //         return item1 != item
        //     })
        // })
        this.setState({
            data: this.state.data.filter( (val, i) => {
                return i !== index
            } )
        })
    }

    // 删除选中的歌曲
    deleteSelectedItem(){
        this.setState({
            data: this.state.data.filter( (val) => {
                return !val.selected
            } )
        })
    }

    render(){
        let data = this.state.data;
        let selectedData = this.state.data.filter((val) => {
            return val.selected
        })
        let likedData = this.state.data.filter((val) => {
            return val.liked
        })

        return(
            <div className="music-page" id="musicApp">
                <Head
                    add={this.add}
                />
                <Main
                    data={this.state.data}
                    isCheckAll={this.isCheckAll()}
                    setCheckAll={this.setCheckAll}
                    setCheck={this.setCheck}
                    setLike={this.setLike}
                    deleteItem={this.deleteItem}

                />
                <Footer
                    dataLength = {data.length}
                    selectedDataLength = {selectedData.length}
                    likedData={likedData.length}
                    deleteSelectedItem={this.deleteSelectedItem}
                    listState={this.state.listState}
                />
            </div>
        )
    }
}

export default Music;