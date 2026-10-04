import "@autosure/ui";
import { createApp, h, reactive } from "vue";
import App from "./App.vue";
// Le contrat d'intégration d'AutoSure : tout micro frontend expose mount(container, props)
export function mount(container, initialProps) {
  const props = reactive({ ...initialProps });

  const app = createApp({ render: () => h(App, props) });
  app.mount(container);

  return {
    update(nextProps) {
      Object.assign(props, nextProps);
    },
    unmount() {
      app.unmount();
    },
  };
}
