import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent implements OnInit {
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
