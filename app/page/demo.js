import React from 'react';
import './demo.scss'
import { createStore } from 'redux';
import { DATA_LIST } from '../config/data'

class List extends React.Component{
    render(){
        return(
            <ul>
                {
                    this.props.data.map( (val, index) => {
                        return(
                            <li key={index}>
                                <p className="username">{val.username}</p>
                                <p className="message">{val.message}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: this.props.show
        }
    }

    showList(show){
        var list = this.refs.list;
        if( show ){// 如果当前的组件是应该显示的
            list.style.height = list.scrollHeight + 'px'
        }else {
            list.style.height = 0
        }
    }

    componentDidMount(){
        this.showList(this.state.show);
    }

    shouldComponentUpdate(nextProps, nextState){
        if( this.state.show != nextProps.show ){ // 这个时候应该更新子组件的state了
            this.state.show = nextProps.show
        }
        if( this.state.show != nextState.show){
            this.showList(nextState.show)
        }
        return false
    }

    changeList(){
        let show = !this.state.show
        this.setState({
            show
        })

        if( show ){
            // 如果当前显示，则隐藏当前不操作其他项
            // 如果当前是隐藏的，则显示当前项，隐藏其他项
            this.props.onChange(this.props.index);
        }
    }

    render(){
        return(
            <div>
                <h2 className="title" onClick={() => this.changeList()}>
                    {this.props.data.name}
                </h2>
                {/*{*/}
                    {/*this.state.show ?  <List data={this.props.data.list}/> : ''*/}
                {/*}*/}
                <div className="listWrap" ref="list">
                    <List data={this.props.data.list}/>
                </div>
            </div>
        )
    }
}

class Demo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showArr: [true, false, false]
        }
    }

    changeList(i){// 参数是从子组件Item中获取的
        let showArr = this.state.showArr.map((val, index) => {
            if( i === index ){  // 点击当下的为true，其他的设置为false
                return true
            }else {
                return false
            }
        })

       this.setState({// 这个时候更新了组件，但是不会执行constructor方法，因此showArr这个state数据就没有办法同步
           showArr
       })
    }

    setShow(){
        // Item组件中的state是在这个组件的constructor中调用的，但是更新的时候不会调用这个组件的constructor方法
        var list = Object.keys(DATA_LIST).map( (val, index) => {
            return <Item
                data={DATA_LIST[val]}
                key={index}
                show={this.state.showArr[index]}
                onChange={(i) => this.changeList(i) }
                index={index}
            />
        })

        return list
    }

    render(){
        return(
            <div className="panel">
                {this.setShow()}
            </div>
        )
    }
}

export default Demo;