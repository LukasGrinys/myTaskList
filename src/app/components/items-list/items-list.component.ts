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
    this.loadStoredData();
  }

  loadStoredData():void {
    const storedList = localStorage.getItem('toDoList');
    if (storedList) {
      const cachedData = JSON.parse(storedList).tasks;
      let tasks = [];
      cachedData.forEach( (todo) => {
        let newTask = {
          date : todo['date'],
          task : todo['task'],
          completed : todo['completed'],
          isBeingDeleted : false
        }
        tasks.push(newTask);
      }); 
      this.tasks = tasks;
    }
  }

  checkItem(index):void {
    let currentState = this.tasks[index].completed;
    this.tasks[index].completed = !currentState;
    this.saveList();
  }

  returnRelativeTime(index) {
    let date = this.tasks[index].date;
    return dayjs(date).fromNow();
  }

  deleteItem(index):void {
    this.tasks[index].isBeingDeleted = true;
    setTimeout( () => {
      this.tasks.splice(index,1);
      this.saveList();
    }, 1000)
  }

  addTask(task):void {
    this.tasks.push(task);
    this.saveList();
  }

  saveList():void {
    let tasks = [];
    this.tasks.forEach( (todo) => {
      let taskData = {
        date : todo.date,
        task : todo.task,
        completed : todo.completed
      };
      tasks.push(taskData);
    });
    let cache = JSON.stringify({ tasks });
    localStorage.setItem('toDoList', cache);
  }

  renderTimeIcon(index) {
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
