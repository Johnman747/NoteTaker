import React, { Component } from 'react';
import { IonInput, IonButton, IonItem } from '@ionic/react';
import './noteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteContent: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    // When the user input changes, set the newNoteContent
    // to the value of what's in the input box.
    handleUserInput(e) {
        this.setState({
            newNoteContent: e.target.value, // the value of the text input
        })
    }

    writeNote() {
        // call a method that sets the noteContent for a note to
        // the value of the input
        this.props.addNote(this.state.newNoteContent);

        // Set newNoteContent back to an empty string.
        this.setState({
            newNoteContent: '',
        })
    }

    render() {
        return (
            <div className="bottomInput">
                <IonItem>
                    <IonInput
                        placeholder="Write a new note..."
                        value={this.state.newNoteContent}
                        onIonChange={(e) => this.handleUserInput(e)} />
                    <IonButton size="large" fill="solid" color="primary" onClick={this.writeNote}>Add Note</IonButton>
                </IonItem>
            </div>
        )
    }
}

export default NoteForm;