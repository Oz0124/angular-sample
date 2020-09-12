import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PickListModule } from 'primeng/picklist';
import { TabViewModule } from 'primeng/tabview';

import { CommonNavbarComponent } from './components/common-navbar/common-navbar.component';
import { SafePipe } from './pipes/safe.pipe';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';
import { MessageBoardComponent } from './components/message-board/message-board.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    // private
    declarations: [
        CommonNavbarComponent,
        SafePipe,
        CommonFooterComponent,
        MessageBoardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ListboxModule,
        RadioButtonModule,
        InputTextareaModule,
        InputTextModule,
        SelectButtonModule,
        DropdownModule,
        MenuModule,
        PickListModule,
        TabViewModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    // public
    exports: [
        ListboxModule,
        RadioButtonModule,
        InputTextareaModule,
        InputTextModule,
        SelectButtonModule,
        DropdownModule,
        MenuModule,
        PickListModule,
        TabViewModule,
        FormsModule,
        CommonNavbarComponent,
        TranslateModule,
        SafePipe,
        CommonFooterComponent,
        MessageBoardComponent
    ],
    entryComponents: [
    ]
})
export class SharedModule { }
