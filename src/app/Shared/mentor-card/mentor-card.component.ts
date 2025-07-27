import { Component, input } from '@angular/core';
import { instructor } from '../Models/instructor';
import { Divider } from "primeng/divider";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mentor-card',
  imports: [Divider,FormsModule],
  templateUrl: './mentor-card.component.html',
  styleUrl: './mentor-card.component.css'
})
export class MentorCardComponent {
  rating=1
  instuctor=input<instructor>()

}
