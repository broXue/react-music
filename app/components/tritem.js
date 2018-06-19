import React from 'react';

class TrItem extends React.Component{
    render(){
        let data = this.props.data;
        return(
            <tr className={(data.selected ? 'selected' : '') + (data.liked ? ' liked' : '')}>
                <td>
                    <input
                        type="checkbox"
                        name=""
                        checked={data.selected}
                        onChange={(e) => {
                            this.props.setCheck(this.props.index, e.target.checked)
                        }}
                    />
                </td>
                <td>{data.song}</td>
                <td>{data.singer}</td>
                <td>
                    <input
                        type="checkbox"
                        name=""
                        checked={data.liked}
                        onChange={(e) => {
                            this.props.setLike(this.props.index, e.target.checked)
                        }}
                    />
                </td>
                <td>
                    <a href="javascript:;" onClick={() => {
                        this.props.deleteItem(data, this.props.index)
                    }}>X</a>
                </td>
            </tr>
        )
    }
}

export default TrItem;