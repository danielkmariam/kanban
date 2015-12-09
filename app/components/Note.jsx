import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class Note extends React.Component {

constructor(props) {
		super(props);

		this.state = {
			editing: false
		};
	}

	render() {
		const {value, onEdit, ...props} = this.props;
		const editing = this.state.editing;

		return (
			<div {...props}>
				{editing ?  this.renderEdit() : this.renderValue()}
			</div>
		);
	}

	renderEdit = () => {
		return <input type="text"
			autoFocus={true}
			defaultValue={this.props.value}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} /> ;
	}

	renderValue = () => {
		const onDelete = this.props.onDelete;

		return (
			<div onClick={this.edit}>
				<span className="value">{this.props.value}</span>
				{onDelete ? this.renderDelete() : null }
			</div>
		);
	}

	edit = () => {
		this.setState({
			editing: true
		});
	}

	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}

	finishEdit = (e) => {
		this.props.onEdit(e.target.value);

		this.setState({
			editing: false
		});
	}

	renderDelete = () => {
		return <button className="delete" onClick={this.props.onDelete}>x</button>;
	}
};