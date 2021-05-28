import React from 'react'
import './Modal.css'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const style = {
  closeButton: {
    float: 'right',
    color: 'grey',
  },
};

export default class Modal extends React.Component{
	state = {
		isOpen: false,
	}
	render(){
		return(
			<React.Fragment>
			<Button variant="outlined" color="primary" onClick={()=>this.setState({isOpen: true})}>Open Modal</Button>
			{this.state.isOpen && <div className='modal'>
				<div className='modal-body'>
					<IconButton aria-label="close" style={style.closeButton} onClick={()=>this.setState({isOpen: false})}>
			          <CloseIcon />
			        </IconButton>
					<h1>Modal title</h1>
					<p>Something Something</p>					
				</div>
			</div>}
			</React.Fragment>
		)
	}
}