import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AltContainer from 'alt-container';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import Notes from './Notes.jsx';

import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import Lanes from './Lanes.jsx';

@DragDropContext(HTML5Backend)
export default class App extends React.Component
{
	render() {
		return (
			<div>
				<button className="add-item" onClick={this.addItem}>Add Lane</button> 
				<AltContainer
					stores={[LaneStore]}
					inject={{
						items: () => LaneStore.getState().lanes || []
					}}
				>
				<Lanes />
				</AltContainer>
			</div>
		);
	};

	addItem() {
		LaneActions.create({name: 'New lane'});
	}
};