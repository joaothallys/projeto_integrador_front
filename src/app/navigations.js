const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { label: "Ferramentas", type: "label" },
  {
    name: "Ferramentas",
    icon: "favorite",
    badge: { value: "3+", color: "secondary" },
    children: [
      { name: "Cotação", path: "/material/customer", iconText: "C" },
      { name: "Gerenciamento", path: "/material/manage", iconText: "G" },
      { name: "Integrações", path: "/material/progress", iconText: "P" },
      //{ name: "Radio", path: "/material/radio", iconText: "R" },
      //{ name: "Switch", path: "/material/switch", iconText: "S" },
      //{ name: "Slider", path: "/material/slider", iconText: "S" },
      //{ name: "Table", path: "/material/table", iconText: "T" }
    ]
  },
];

export default navigations;
