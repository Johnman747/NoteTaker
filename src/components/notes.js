import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonText, IonInput } from '@ionic/react';
import './notes.css';

class Note extends Component {

    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.state = {
            edit: false,
            noteContent: this.noteContent,
        }
    }

    handleRemoveNote(id) {
        this.props.removeNote(id);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            noteContent: e.target.value,
        })
    }

    handelSave = (id, noteContent) => {
        this.props.editNote(id, noteContent)

        this.setState({
            ...this.state,
            edit: !this.state.edit
        })
    }

    handelEdit = () => {
        this.setState({
            ...this.state,
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <IonItem >
                {this.state.edit ?
                    <IonInput className="noteInput" value={this.state.noteContent} onIonChange={(e) => this.handleChange(e)}></IonInput>
                    :
                    <IonText ><h2>{this.state.noteContent}</h2></IonText>
                }
                {this.state.edit ?
                    <IonText slot="end" onClick={() => this.handelSave(this.noteId, this.state.noteContent)}>Save</IonText>
                    :
                    <IonText slot="end" onClick={this.handelEdit}>Edit</IonText>
                }
                <IonText onClick={() => this.handleRemoveNote(this.noteId)} slot="end" color="danger" ><h2>X</h2></IonText>
            </IonItem>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;