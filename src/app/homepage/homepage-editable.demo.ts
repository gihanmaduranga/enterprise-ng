import { Component } from '@angular/core';

import { SohoToastService, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-homepage-editable-demo',
  templateUrl: 'homepage-editable.demo.html',
})
export class HomePageEditableDemoComponent {
  isEditingMode = false;

  constructor(private toastService: SohoToastService, private messageService: SohoMessageService) { }

  onToggleEditingMode() {
    this.isEditingMode = !this.isEditingMode;
  }

  onResizeCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Resized', message: 'A widget has been resized' });
    console.log(event);
  }

  onReorderCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Reordered', message: 'A widget has been moved' });
    console.log(event);
  }

  // Use arrow function for proper resolution of this in the callback
  public onBeforeRemoveCard = (event) => {
    const result = new Promise((resolve, reject) => {
      const buttons = [
        {
          text: 'Cancel', click: (e, modal) => {
            modal.close(true);
            this.toastService.show({
              draggable: true, title: 'Widget Remove Cancelled', message: 'The user cancelled the remove operation.'
            });
            reject();
          }, isDefault: true
        },
        {
          text: 'Remove', click: (e, modal) => {
            modal.close(true);
            resolve();
          }
        }];

      this.messageService
        .confirm()
        .title('Confirm Remove')
        .message('Are you sure you want to remove this widget?')
        .buttons(buttons)
        .open();
    });
    return result;
  }

  onRemoveCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Removed', message: 'A widget has been removed' });
    console.log(event);
  }
}
