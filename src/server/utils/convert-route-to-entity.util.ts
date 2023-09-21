const mapping: Record<string, string> = {
  chefs: 'chef',
  menus: 'menu',
  restaurants: 'restaurant',
  'table-reservations': 'table_reservation',
  users: 'user',
  waiters: 'waiter',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
