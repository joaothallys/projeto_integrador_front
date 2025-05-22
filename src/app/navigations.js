const navigations = [
  { name: "Minha carteira", path: "/dashboard/default", icon: "dashboard" },
  { label: "Ferramentas", type: "label" },
  {
    name: "Ferramentas",
    icon: "favorite",
    badge: { value: "3+", color: "secondary" },
    children: [
      { name: "Simular Fretes", path: "/material/customer", iconText: "C" },
      { name: "Historico", path: "/material/table", iconText: "H" },
      { name: "Imprimir Etiquetas", path: "/material/manage", iconText: "G" },
      { name: "Integrações", path: "/material/progress", iconText: "P" },
      { name: "Transportadoras", path: "/material/radio", iconText: "T" },
      //{ name: "Switch", path: "/material/switch", iconText: "S" },
      //{ name: "Slider", path: "/material/slider", iconText: "S" },
    ]
  },
];

export default navigations;
