import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthGuard} from "./security/guards/auth.guard";

export interface NavRoute extends Route {
  path?: string;
  icon?: string;
  group?: string;
  groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = '';

export const navRoutes: NavRoute[] = [
  // {
  //   data: { title: 'Student' },
  //   path: 'getStudent',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./pages/students-page/student-get/student-get.module').then(
  //       m => m.StudentModule,
  //     ),
  // },

];

@Injectable({
  providedIn: 'root',
})
export class NavRouteService {
  navRoute: Route;
  navRoutes: NavRoute[];

  constructor(router: Router) {
    this.navRoute = router.config.find(route => route.path === sideNavPath)!;
    // @ts-ignore
    this.navRoutes = this.navRoute?.children?.filter(route => route.data && route.data['title'])
      .reduce((groupedList: NavRoute[], route: NavRoute) => {
        if (route.group) {
          // @ts-ignore
          const group: NavRoute = groupedList.find(navRoute => {
            return (
              navRoute.group === route.group &&
              navRoute.groupedNavRoutes !== undefined
            );
          });
          if (group) {
            // @ts-ignore
            group.groupedNavRoutes.push(route);
          } else {
            groupedList.push({
              group: route.group,
              groupedNavRoutes: [route],
            });
          }
        } else {
          groupedList.push(route);
        }
        return groupedList;
      }, []);
  }

  public getNavRoutes(): NavRoute[] {
    return this.navRoutes;
  }
}
