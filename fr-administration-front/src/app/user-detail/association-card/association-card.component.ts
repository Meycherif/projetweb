import { Component, Input, OnInit } from '@angular/core';

const memberCountTagLineList = [
  "That's a lot of people!",
  'Number 1 in the world!',
  '100% fresh!',
  "You can't beat that!",
  'You will never find a better one!',
];

@Component({
  selector: 'app-association-card',
  templateUrl: './association-card.component.html',
  styleUrls: ['./association-card.component.css'],
})
export class AssociationCardComponent implements OnInit {
  @Input() association!: any;
  randomColor: string = '';

  constructor() {}

  get memberCountTagLine(): string {
    return memberCountTagLineList[
      Math.floor(Math.random() * memberCountTagLineList.length)
    ];
  }

  ngOnInit(): void {
    this.setRandomColor();

  }

  setRandomColor(): void {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.randomColor = color;
  }
}
