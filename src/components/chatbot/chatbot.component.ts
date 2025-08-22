import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotService } from '../../app/services/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})

export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  userInput: string = '';
  messages: { role: string, text: string }[] = [];
  constructor(private chatBotService: ChatbotService) {}
  ngAfterViewChecked(): void {
     this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngOnInit() {
    this.loadChatHistory();
  }

  sendMessage() {
    const userMessage = this.userInput.trim();
    if(!userMessage) return;

    this.messages.push({ role: 'user', text: userMessage });
    this.userInput = '';

    this.chatBotService.askQuestion(userMessage).subscribe({
      next: (res) =>{
        this.messages.push({ role: 'bot', text: res.answer });
      },
      error: (err) => {
        this.messages.push({ role: 'Bot', text: 'حدث خطأ أثناء الاتصال بالخادم' });
        console.error(err);
      }
    })
  }

  loadChatHistory() {
    this.chatBotService.getChatHistory().subscribe({
      next: (data: any) => {
        this.messages = data.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'bot',
          text: msg.text
        }));
      },
      error: err => {
        console.error('Failed to load chat history:', err);
      }
    });
  }

}
