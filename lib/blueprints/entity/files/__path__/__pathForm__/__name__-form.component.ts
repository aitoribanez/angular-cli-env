import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { toast } from 'angular2-materialize'

import ApiWrapperService from '../../../services/apiWrapper.service';

@Component({
  selector: '<%= selector %>-form',
  templateUrl: './<%= selector %>-form.component.html',
  styleUrls: ['./<%= selector %>-form.component.css'],
  // providers: [ApiWrapperService, <%= entityNameCapitalize %>Resolve]
})

export class <%= entityNameCapitalize %>FormComponent implements OnInit {
  nameCtrl: FormControl;
  photoCtrl: FormControl;
  difficultyCtrl: FormControl;
  seedtimeCtrl: FormControl;
  collecttimeCtrl: FormControl;
  <%= entityName %>Form: FormGroup;
  type: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
  private router: Router, private <%= entityName %>Service: ApiWrapperService) {

   if (Object.keys(this.route.snapshot.params).length <= 0) {
     this.type = 'add';
     this.formConfig(fb, {});
   } else if(window.location.pathname.indexOf('edit') !== -1){
     this.type = 'edit';
     this.formConfig(fb, this.route.snapshot.data['<%= entityName %>']);
   } else {
     this.type = 'destroy';
     // this.formConfig(fb, {});
   }

  }

  ngOnInit() {}

 /**
 * Can go to add or edit dependens on type
 */
  call() {
    if(this.type === 'add') { this.add() }
    else if(this.type === 'edit') { this.edit() }
    else { this.destroy(this.route.snapshot.params['id']) }
  }

/* pr(evt) {
  console.log("prAAA")
   this.<%= entityName %>FormComponent.emit('e551fcb0-625a-4421-949d-17e3109e0342');
} */

 /**
 * Save <%= entityName %> on data store
 */
  add() {
    this.<%= entityName %>Service.add('<%= entityName %>s', this.<%= entityName %>Form.value) 
      .subscribe(<%= entityName %> => {
          toast('<%= entityNameCapitalize %> have been saved!', 5000);
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

 /**
 * Edit <%= entityName %> on data store
 */
  edit() {
    this.<%= entityName %>Service.update(`<%= entityName %>s/${this.route.snapshot.params['id']}`, this.<%= entityName %>Form.value) 
      .subscribe(<%= entityName %> => {
          toast('<%= entityNameCapitalize %> have been updated!', 5000);
          this.router.navigate(['/']);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

  /**
 * Destroy <%= entityName %> on data store
 */
  destroy(id) {
    this.<%= entityName %>Service.destroy(`<%= entityName %>s/${id}`)
       .subscribe(<%= entityName %> => {
          toast('<%= entityNameCapitalize %> have been deleted!', 5000);
        }
        // error =>  this.errorMessage = <any>error
      );
  }

/**
 * Form configuration:
 *   - Define controls
 *   - Define group
 */
  formConfig(fb, <%= entityName %>Form) {
      this.nameCtrl = fb.control(<%= entityName %>Form.name || '', Validators.compose([Validators.required, Validators
.minLength(4)]));
    this.photoCtrl = fb.control(<%= entityName %>Form.photo || '', Validators.required);
    this.difficultyCtrl = fb.control(<%= entityName %>Form.difficulty || '', Validators.required);
    this.seedtimeCtrl = fb.control(<%= entityName %>Form.seedtime || '', Validators.required);
    this.collecttimeCtrl = fb.control(<%= entityName %>Form.collecttime || '', Validators.required);

    this.<%= entityName %>Form = fb.group({
      id: UUID.UUID(),
      name: this.nameCtrl,
      photo: this.photoCtrl,
      difficulty: this.difficultyCtrl,
      seedtime: this.seedtimeCtrl,
      collecttime: this.collecttimeCtrl
    });
  }

}
