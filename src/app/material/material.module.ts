import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';

const MATERIAL_COMPONENTS = [
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatGridListModule,
	MatCheckboxModule,
	MatCardModule
]

@NgModule({
	imports: [MATERIAL_COMPONENTS],
	exports: [MATERIAL_COMPONENTS]
})
export class MaterialModule {
}
