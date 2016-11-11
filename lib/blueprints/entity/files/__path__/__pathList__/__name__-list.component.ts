import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ApiWrapperService from '../../services/apiWrapper.service';
import { <%= entityNameCapitalize %> } from '../../entitys/<%= entityName %>';
// import { config } from './config';
import { <%= entityNameCapitalize %>FormComponent } from '../<%= entityName %>-form/<%= entityName %>-form.component';

@Component({
  selector: '<%= selector %>-list',
  templateUrl: './<%= selector %>-list.component.html',
  styleUrls: ['./<%= selector %>-list.component.css'],
  // providers: [ApiWrapperService, <%= entityNameCapitalize %>sResolve, <%= entityNameCapitalize %>FormComponent]
})

@Injectable()
export class <%= entityNameCapitalize %>ListComponent implements OnInit {
  title: string = 'app works!';
  <%= entityName %>s: Array<any>;
  <%= entityName %>FormComponent: <%= entityNameCapitalize %>FormComponent;

  constructor(<%= entityName %>Service: ApiWrapperService, private route: ActivatedRoute,
  <%= entityName %>FormComponent: <%= entityNameCapitalize %>FormComponent) {
    this.<%= entityName %>FormComponent = <%= entityName %>FormComponent;

    let <%= entityName %>s = this.route.snapshot.data['<%= entityName %>s'];

    <%= entityName %>s.map(obj => { 
      obj.collecttime = this._toString(obj.collecttime, config.es.months);
      obj.seedtime = this._toString(obj.seedtime, config.es.months);
    })

    this.<%= entityName %>s = <%= entityName %>s.reverse();
  }

  delete(id) {
    this.<%= entityName %>FormComponent.destroy(id);

   // let product =  this.products.filter(product => product.id == id)[0];
  // let index = this.products.indexOf(product);
    let index = this.<%= entityName %>s.findIndex(<%= entityName %> => <%= entityName %>.id === id);
    this.<%= entityName %>s.splice(index, 1);
  }

  ngOnInit() {
  }

 /**
 * Number to String using an array. (jsdoc)
 * @constructor
 * @param {number} number.
 * @param {months} array.
 */
  private _toString(number: number, months: Array<String>): String {
    return months[number - 1];
  }

}
