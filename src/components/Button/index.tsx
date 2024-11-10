import loadable from "@loadable/component";

const Button = loadable(
  () => import(/* webpackChunkName: "button-chunk" */ "./View"),
  { ssr: false }
);

export default Button;
