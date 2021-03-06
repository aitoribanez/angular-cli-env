import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import ApiWrapperService from '../../services/apiWrapper.service';

@Injectable()
export class <%= entityNameCapitalize %>Resolve implements Resolve<any> {
  constructor(private <%= entityName %>Service: ApiWrapperService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.<%= entityName %>Service.one(`<%= entityName %>s/${route.params['id']}`);
  }

}
