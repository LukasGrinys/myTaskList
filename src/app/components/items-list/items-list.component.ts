import { Component, OnInit, Input } from '@angular/core';
import { Task } from './../../models/Task';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs().format();
dayjs.extend(relativeTime);

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  tasks: Task[];
  constructor() {
    this.tasks = []
  }
  ngOnInit(): void {
    const storedList = localStorage.getItem('toDoList');
    if (storedList) {
      this.tasks = JSON.parse(storedList).tasks;
    }
  }
  checkItem(index) {
    let currentState = this.tasks[index].completed;
    this.tasks[index].completed = !currentState;
    this.saveList();
  }
  returnRelativeTime(index) {
    let date = this.tasks[index].date;
    return dayjs(date).fromNow();
  }
  deleteItem(index) {
    this.tasks[index].isBeingDeleted = true;
    setTimeout( () => {
      this.tasks.splice(index,1);
      this.saveList();
    }, 1000)
  }
  addTask = (task) => {
    this.tasks.push(task);
    this.saveList();
  }
  saveList = () => {
    let cache = JSON.stringify({ tasks : this.tasks});
    localStorage.setItem('toDoList', cache);
  }
  renderTimeIcon = (index) => {
    let date = this.tasks[index].date;
    let now = dayjs(dayjs().format());
    let difference = now.diff(date, 'day');
    if (difference >= 3) { 
      return true 
    } else {
      return false;
    }
  }
}
