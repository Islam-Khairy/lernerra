import { Component, signal } from '@angular/core';
import { Button } from "primeng/button";
import { TagModule, Tag } from 'primeng/tag';
import { Divider } from "primeng/divider";
import { ChartModule } from 'primeng/chart';
import { DrawerModule, Drawer } from 'primeng/drawer';
import { NgClass } from '@angular/common';
import { Avatar, AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  imports: [Button, Tag, Divider, ChartModule, Drawer,NgClass,Avatar],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    visible=false
    sidebarVisible=false
   data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Series 1',
        data: [50, 100, 150, 200, 350, 380, 320, 400, 500, 600, 750, 1000],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Series 2',
        data: [30, 80, 120, 180, 280, 300, 280, 350, 420, 500, 620, 800],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Series 3',
        data: [20, 50, 80, 120, 180, 200, 180, 220, 280, 350, 400, 500],
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.3)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Life Time Sales',
        font: {
          size: 16,
          weight: 'normal'
        },
        color: '#333',
        align: 'start',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: false // Hide legend since the original doesn't show it
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          color: '#666'
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 1200,
        ticks: {
          stepSize: 200,
          color: '#666',
          callback: function(value: any) {
            return value.toLocaleString();
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
          lineWidth: 1
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 2
      }
    }
  };

  drawerOpen = false;



}
