export const rootPaths = {
  homeRoot: '',
  pagesRoot: 'pages',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
};

export default {
  home: `/${rootPaths.homeRoot}`,

  //It for the NGO ADMIN
  addsocialworker: `/${rootPaths.authRoot}/addsocialworker`,
  socialworkerlist: `/${rootPaths.authRoot}/socialworkerlist`,
  addclient: `/${rootPaths.authRoot}/addclient`,
  clientlist: `/${rootPaths.authRoot}/clientlist`,
  addadminngo: `/${rootPaths.authRoot}/addadminngo`,
  adminlistngo: `/${rootPaths.authRoot}/adminlistngo`,

  //Authentication
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,

  applicationmanagement: `/${rootPaths.authRoot}/applicationmanagement`,
  addrehabadmin : `/${rootPaths.authRoot}/addrehabadmin`,
  clientprogress: `/${rootPaths.authRoot}/clientprogress`,
  roomallocation: `/${rootPaths.authRoot}/roomallocation/:id`, // dynamic route
  dashboard: `/${rootPaths.authRoot}/dashboard`,
  userprofile: `/${rootPaths.authRoot}/userprofile`,

  404: `/${rootPaths.errorRoot}/404`,
};
