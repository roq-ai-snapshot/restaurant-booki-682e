interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Chef', 'Waiter'],
  tenantName: 'Restaurant',
  applicationName: 'Restaurant booking engine',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View restaurant information',
    'View menu items',
    'Make a table reservation',
    'View waiter and chef information',
  ],
  ownerAbilities: [
    'Manage user information',
    'Manage restaurant details',
    'Manage table reservations',
    'Manage menu items',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/c15a3277-acdc-4dfd-a1b4-61090d19fa3c',
};
