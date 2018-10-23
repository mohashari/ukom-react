import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Items = Loadable({
  loader: () => import('./views/Items/'),
  loading: Loading,
});

const ItemForms = Loadable({
  loader: () => import('./views/Items/Form/ItemsForm'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading: Loading,
});

const Sales = Loadable({
  loader: () => import('./views/Sales'),
  loading: Loading,
});

const SalesForm = Loadable({
  loader: () => import('./views/Sales/Form/SalesForm'),
  loading: Loading,
  });

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/items', name: 'Items', component: Items },
  { path: '/items-add', exact: true, name: 'Add', component: ItemForms },
  { path: '/items-detail/:id', exact: true, name: 'Items Detail', component: ItemForms },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/sales-add', exact: true, name: 'Add', component: SalesForm },


];

export default routes;
