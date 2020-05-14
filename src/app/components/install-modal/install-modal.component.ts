import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-install-modal',
  templateUrl: './install-modal.component.html',
  styleUrls: ['./install-modal.component.css']
})
export class InstallModalComponent implements OnInit {
  showInstallationModal: boolean = false;
  deferredPrompt: any;
  constructor() { }
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.deferredPrompt = e;
    this.showInstallationModal = true;
  }
  installApp = () => {
    this.closeInstallationModal();
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then( (choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    })
  }
  closeInstallationModal = () => {
    this.showInstallationModal = false;
  }

  ngOnInit(): void {
  }

}
