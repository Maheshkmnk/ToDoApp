import { Component, ElementRef, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  noteData!:FormGroup;
  boxes: Box[] = []; 
  edit:boolean=false;
  currentEditNoteId!:string;
  currentNoteIndex!:number;

  @ViewChild('titleInput') titleInput!:ElementRef

  ngOnInit() {
    console.log(this.boxes)
    console.log("length",this.boxes.length)
    const storedBoxes = localStorage.getItem('dynamicBoxes');
    
    this.noteData = new FormGroup({
      title: new FormControl(''),
      content: new FormControl('')
    });
   
    if (storedBoxes) {
      this.boxes = JSON.parse(storedBoxes);
    }    
  }
 
  ngAfterViewCheck() {
    console.log("init")
    if (this.edit) {
      console.log("init if inside")
      this.titleInput.nativeElement.focus();
    }
  }

  addNote() {
    // const title = prompt("Enter title:");
    // const content = prompt("Enter content:");

    // if (title && content) {
      const newBox: Box = {
        id: uuidv4(),
        title:'',
        content:'',
        editedDate: new Date().toISOString().split('T')[0]
      };
      this.boxes.push(newBox);
      this.updateLocalStorage();
      console.log(this.boxes)
      this.edit=true;
      this.currentEditNoteId=newBox.id
    // }
  }

  editNote(id:string){
    this.edit=true
    this.currentEditNoteId=id
    this.currentNoteIndex = this.boxes.findIndex((box) => box.id === id)

    // Get the note data
    let currentEditNoteData = this.boxes[this.currentNoteIndex]

    // Setting the current note data to input
    this.noteData.patchValue({
      title:currentEditNoteData.title,
      content:currentEditNoteData.content
    })

    // this.titleInput.nativeElement.focus();
  }

  saveNote(noteId:string){
    console.log("save note called")
    
    let currentNoteFound = this.boxes.findIndex((box) => box.id === noteId)
    if(currentNoteFound !==-1){
      // console.log('currentNoteFound',currentNoteFound)
      // console.log('currentNoteFound',this.noteData.value.title)
      // console.log('currentNoteFound',this.noteData.value.content)

      this.boxes[currentNoteFound].title  = this.noteData.value.title;
      this.boxes[currentNoteFound].content  = this.noteData.value.content;
      this.boxes[currentNoteFound].editedDate  = new Date().toISOString().split('T')[0]
      this.updateLocalStorage();

      this.noteData.reset()
    }

    this.edit=false;
    this.currentEditNoteId=''
  }

  deleteNote(id:string) {
    console.log("delete called")
      this.boxes = this.boxes.filter((box) => box.id !== id)
      this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('dynamicBoxes', JSON.stringify(this.boxes));
  }
}

interface Box {
  id:string;
  title: string;
  content: string;
  editedDate: string;
} 