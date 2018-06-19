import React from 'react';
import './header.scss'

const ADD_TODO = 'ADD_TODO'



class Header extends React.Component{
    componentDidMount(){
        // function todoApp(state = initialState, action) {
        //     switch (action.type){
        //         case SET_VISIBILITY_FILTER:
        //             return Object.assign({}, state, {
        //                 VISIBILITY_FILTER: action.filter
        //             });
        //         case ADD_TODO:
        //             return Object.assign({}, state, {
        //                 todos: [
        //                     ...state.todos,
        //                     {
        //                         text: action.text,
        //                         completed: true
        //                     }
        //                 ]
        //             });
        //         case TOGGLE_TODO:
        //             return Object.assign({}, state, {
        //                 todos: state.todos.map((todo, index) => {
        //                     if(index === action.index){
        //                         return Object.assign({}, todo, {
        //                             completed: !todo.completed
        //                         })
        //                     }
        //
        //                     return todo;
        //                 })
        //             })
        //         default:
        //             return state;
        //     }
        // }
        
        function todos(state = [], action) {
            switch (action.type){
                case ADD_TODO:
                    return Object.assign({}, state, {
                        todos: [
                            ...state.todos,
                            {
                                text: action.text,
                                completed: true
                            }
                        ]
                    });
                case TOGGLE_TODO:
                    return Object.assign({}, state, {
                        todos: state.todos.map((todo, index) => {
                            if(index === action.index){
                                return Object.assign({}, todo, {
                                    completed: !todo.completed
                                })
                            }

                            return todo;
                        })
                    })
                default:
                    return state;
            }
        }
        
        function todoApp(state = initialState, action) {
            switch (action.type){
                case SET_VISIBILITY_FILTER:
                    return Object.assign({}, state, {
                        vivisibilityFilter: action.filter
                    })
                case ADD_TODO:
                    return Object.assign({}, state, {
                        todos: todos(state.todos, action)
                })
                case TOGGLE_TODO:
                    return Object.assign({}, state, {
                        todos: todos( state.todos, action)
                    })
                default:
                    return state
            }
        }
    }

    render(){
        var m = {
            type: ADD_TODO,
            text: 'Build my first Redux app',
            index: 1
        }

        function addTodo(text) {
            return {
                type: ADD_TODO,
                text: text
            }
        }

        return(
            <div className="components-header">
                <img src="/static/images/on.png" alt=""/>
                <div className="caption">音乐播放器</div>
            </div>
        )
    }
}

export default Header;


