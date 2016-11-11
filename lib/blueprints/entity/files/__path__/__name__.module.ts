import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= entityNameCapitalize %>Component } from './<%= entityName %>.component';
import { <%= entityNameCapitalize %>ListComponent } from './<%= entityName %>-list/<%= entityName %>-list.component';
import { <%= entityNameCapitalize %>FormComponent } from './<%= entityName %>-form/<%= entityName %>-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [<%= entityNameCapitalize %>Component, <%= entityNameCapitalize %>ListComponent, <%= entityNameCapitalize %>FormComponent],
  exports: [<%= entityNameCapitalize %>Module]
})
export class <%= entityNameCapitalize %>Module { }
