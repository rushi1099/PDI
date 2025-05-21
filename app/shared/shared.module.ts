import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    FormsModule,
    MenubarModule,
    ToolbarModule,
    AvatarModule,
    ButtonModule,
    AccordionModule,
    FieldsetModule,
    TabViewModule,
    ReactiveFormsModule,
    ToastModule,
    TabMenuModule
  ]
})
export class SharedModule { 
}
