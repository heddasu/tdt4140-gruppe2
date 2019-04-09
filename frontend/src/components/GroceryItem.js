import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class GroceryItem extends Component {
    getStyle = () => {
        /*if(this.props.grocery.completed){
            return{
                textDecoration: 'line-through'
            }
        }else{
            return{
                textDecoration: 'none'
            } 
        }*/
        return{
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.grocery.completed ? 'line-through' : 'none'
        }
    }


    render() {
    
        const {id, title} = this.props.grocery;

        return (
        <div style={this.getStyle()}>
            <p>
                <input type="checkbox" onChange={this.props.markComplete.bind(this,id)} /> {' '}
                { title }
                <button onClick={this.props.delGrocery.bind(this,id)} style={btnStyle}>x</button>
            </p>
        </div>
        )
    }
}

//PropTypes
GroceryItem.propTypes = {
    groceries: PropTypes.object.isRequired
}

/*const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'

}
*/
