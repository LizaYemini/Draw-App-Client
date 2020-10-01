import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentsService } from '../Services/documents.service';
import { DrawingService } from '../Services/drawing.service';
import { SharedDataService } from '../Services/shared-data.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

export interface ImageInfo {
  imageUrl: string;
  name: string
}

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  selectedFile: ImageSnippet
  //selectedFileUrl: ImageInfo = { imageUrl: 'assets/clear.png', name: 'clear' }
  @Input() selectedFileUrl: string = 'assets/clear.png'
  userId: string
  @Input() docId: string
  @Input() docName: string = ""
  @Input() choseName: boolean = false
  @Input() owner: string
  imagesSelect: string[] = [
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg"
  ]
  /*imagesSelect: ImageInfo[] = [
    { imageUrl: 'assets/1.jpg', name: '1' },
    { imageUrl: 'assets/2.jpg', name: '2' },
    { imageUrl: 'assets/3.jpg', name: '3' },
    { imageUrl: 'assets/4.jpg', name: '4' }
  ]; */
  constructor(sharedDataService: SharedDataService, private documentService: DocumentsService) {
    sharedDataService.currentMessage.subscribe(msg => {
      this.owner = msg
      this.userId = msg
    })
    this.SubscribeOnSubjects()
  }
  ngOnInit(): void {
  }

  SubscribeOnSubjects() {
    this.documentService.onAddDocumentResponseOK().subscribe
      (
        response => {
          this.docId = response.docId
        }
      )

    this.documentService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          console.log(message.message)
        }
      )
    this.documentService.onUpdateDocumentResponseOK().subscribe
      (
        response => {
          console.log("document updated")
        }
      )
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader()

    reader.addEventListener('load', (event: any) => {
      //this.selectedFileUrl = { imageUrl: new ImageSnippet(event.target.result, file).src, name: file.name }
      this.selectedFileUrl = new ImageSnippet(event.target.result, file).src
      /*
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        }) */
    });

    reader.readAsDataURL(file)
  }

  selected(event) {
    this.selectedFileUrl = event.value
    this.documentService.UpdateDocument({ Owner: this.owner, DocumentName: this.docName, ImageUrl: this.selectedFileUrl, DocId: this.docId })
  }

  getDocName(val) {
    this.docName = val.target.value
  }
  updateName() {
    if (this.docName != null) {
      this.choseName = true
    }
    if (this.docId == null) {
      this.documentService.AddDocument({ Owner: this.owner, DocumentName: this.docName, ImageUrl: this.selectedFileUrl })
    } else {
      this.documentService.UpdateDocument({ Owner: this.owner, DocumentName: this.docName, ImageUrl: this.selectedFileUrl, DocId: this.docId })
    }
  }


}
