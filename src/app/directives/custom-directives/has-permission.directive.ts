import { Directive, OnInit, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AppService } from '../../services/app.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit{

  private currentUser;
  private permissions = [];
  private isHidden = true;

  constructor(private _appService: AppService,
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,) { }

  ngOnInit() {
    this._appService.userPermissions.subscribe(result => {
      this.currentUser = result;
      this.updateView();
    })
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
    console.log(val);
    console.log(this.currentUser.permissions);
  }

  private updateView() {
    console.log(this.checkPermission())
    if(this.checkPermission()) {
      if(this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if(this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());

        if(permissionFound) {
          hasPermission = true;
        } else {
          hasPermission = false;
        }
      }
    }

    return hasPermission;
  }

}
