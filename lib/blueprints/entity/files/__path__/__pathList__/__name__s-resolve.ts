import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import ApiWrapperService from '../../services/apiWrapper.service';

@Injectable()
export class  <%= entityNameCapitalize %>sResolve implements Resolve<any> {
  constructor(private <%= entityName %>Service: ApiWrapperService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.<%= entityName %>Service.get('<%= entityName %>s');
  }  
}
