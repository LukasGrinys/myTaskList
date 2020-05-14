import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit {
  @Output() addTask: EventEmitter<any> = new EventEmitter();
  newTask: string;
  constructor() { }

  ngOnInit(): void {
  }

  submitTask() {
    if (this.newTask && this.newTask.trim().length > 0) {
      const newTask = {
        date: dayjs().format(),
        task: this.newTask.trim(),
        completed: false,
        isBeingDeleted: false
      };
      this.addTask.emit(newTask);
    }
  }
}
