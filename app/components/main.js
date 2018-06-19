import React from 'react';
import TrItem from './tritem';
import './main.scss'

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let data = this.props.data;
        return(
            <div className="main-component">
                <table className="main"
                       style={{ display : data.length ? 'table' : 'none'}} >
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    id="checkAll"
                                    checked={this.props.isCheckAll}
                                    onChange={(e) => {
                                        this.props.setCheckAll(e.target.checked)
                                    }}
                                />
                                <label htmlFor="checkAll">全选</label>
                            </th>
                            <th>歌曲</th>
                            <th>歌手</th>
                            <th>收藏</th>
                            <th>删除</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((val, index) => {
                            return <TrItem
                                key={index}
                                data={val}
                                index={index}
                                setCheck={this.props.setCheck}
                                setLike={this.props.setLike}
                                deleteItem={this.props.deleteItem}
                            />
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Main;