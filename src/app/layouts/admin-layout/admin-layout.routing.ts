import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {TableComponent} from '../../pages/table/table.component';
import {UserComponent} from '../../pages/user/user.component';
import {AlertHistoryComponent} from '../../pages/alertHistory/alertHistory.component';


export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard/:nodeId', // child route path
        component: DashboardComponent, // child route component that the router renders
      }]
  },
    //     },
     { path: 'alerts',           component: AlertHistoryComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    //  { path: 'dashboard/' + sessionStorage.getItem('nodeId') + '/avg',           component: AverageComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent }
];
