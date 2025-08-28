
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { initFlowbite } from 'flowbite';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { AccountService } from '../app/core/services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ChatbotComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'FrontEnd';
  showChatbot = false;
  acountService=inject(AccountService);
  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
    console.log('Chatbot toggled:', this.showChatbot);
  }
  
  ngOnInit(): void {
    initFlowbite();
  }


}
