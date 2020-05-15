import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-app-v2';
  listTitle:string;
  hideListTitleModal:boolean;

  constructor() {
    this.hideListTitleModal = true;
  }

  ngOnInit(): void {
    let savedListTitle = localStorage.getItem('toDoListTitle');
    if (savedListTitle) {
      this.listTitle = savedListTitle;
    } else {
      this.listTitle = "My List";
    }
  }

  closeListTitleModal = (bool) => { 
    this.hideListTitleModal = true;
    if (bool === true) {
      if (this.listTitle.trim().length === 0) {
        this.listTitle = "My List";
      };
      this.saveListTitle()
    } else {
      let savedTitle = localStorage.getItem('toDoListTitle');
      if (savedTitle) {
        this.listTitle = savedTitle;
      } else {
        this.listTitle = "My List"
      }
    }
  }
  showListTitleModal = () => { this.hideListTitleModal = false}

  saveListTitle = () => {
    localStorage.setItem('toDoListTitle', this.listTitle);
  }
}