let base = "/";
export const routerMap = [
    {
        path : base + "login",
        name: "login",
        component: ()=>import("@/components/login")
    },
    {
        path : base + "list",
        name: "list",
        component: ()=>import("@/components/list")
    },
    {
        path : base + "listModule",
        name:"listModule",
        component: ()=>import("@/components/listModule")
    },
]