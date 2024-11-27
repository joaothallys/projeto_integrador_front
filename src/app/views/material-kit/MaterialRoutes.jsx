import { lazy } from "react";
import Loadable from "app/components/Loadable";

//const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")));
const AppProgress = Loadable(lazy(() => import("./AppProgress")));
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")));
const AppTable = Loadable(lazy(() => import("./tables/AppTable")));
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")));
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")));
const AppButton = Loadable(lazy(() => import("./gerenciamento/manage")));
//const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")));
const AppAutoComplete = Loadable(lazy(() => import("./auto-complete/AppAutoComplete")));

const materialRoutes = [
  { path: "/material/table", element: <AppTable /> },
  { path: "/material/manage", element: <AppButton /> },
  //{ path: "/material/icons", element: <AppIcon /> },
  { path: "/material/progress", element: <AppProgress /> },
  { path: "/material/switch", element: <AppSwitch /> },
  { path: "/material/radio", element: <AppRadio /> },
  { path: "/material/slider", element: <AppSlider /> },
  { path: "/material/customer", element: <AppAutoComplete /> },
  //{ path: "/material/snackbar", element: <AppSnackbar /> }
];

export default materialRoutes;
