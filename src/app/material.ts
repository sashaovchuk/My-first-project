import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatButtonToggleModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatBadgeModule,
        MatButtonToggleModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatBadgeModule,
        MatButtonToggleModule
    ],
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
})

export class MaterialModule { }