import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { DB_CONFIG } from './Config/Config';
import firebase from 'firebase/app';
import 'firebase/database'

import Note from './components/notes';
import NoteForm from './components/noteForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }

  componentDidMount() {
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
      // console.log(this.state)
    })

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote = (note) => {
    this.database.push().set({ noteContent: note });
  }

  removeNote = (noteId) => {
    // console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }

  editNote = (noteId, noteContent) => {
    this.database.child(noteId).update({noteContent: noteContent});
  }


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle >Todo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Note Taker React+Ionic</IonTitle>
            </IonToolbar>
            <IonList inset="true" lines="full">
              {
                this.state.notes.map((note) => {
                  return (
                    <Note noteContent={note.noteContent}
                      noteId={note.id}
                      key={note.id}
                      removeNote={this.removeNote}
                      editNote={this.editNote}
                      />
                  )
                })
              }
            </IonList>
            <div className="notesFooter">
              <NoteForm addNote={this.addNote} />
            </div>
          </IonHeader>
        </IonContent>
      </IonPage>
    );
  }
};

export default App;
