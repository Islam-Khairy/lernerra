import { CarouselModule } from 'primeng/carousel';
import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { NgStyle } from '@angular/common';
import { Button } from "primeng/button";

interface review {
  name: string;
  role: string;
  image: string;
  content: string;
}

@Component({
  selector: 'app-what-they-say-carousal',
  imports: [CarouselModule, TagModule],
  templateUrl: './what-they-say-carousal.component.html',
  styleUrl: './what-they-say-carousal.component.css',
})
export class WhatTheySayCarousalComponent {
  @Input() reviews: review[] = [];

    responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px', 
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
