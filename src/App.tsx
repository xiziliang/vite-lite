import { defineAsyncComponent, defineComponent, Fragment } from 'vue';
import { RouterView } from 'vue-router';
import { TooltipsGlobal } from '@/directives/tooltip';

export default defineComponent({
  setup() {
    const GlobalTooltip = defineAsyncComponent(() => import('@/components/global-tooltip').then(x => x.GlobalTooltip));

    return () => (
      <Fragment>
        <RouterView />
        {TooltipsGlobal.value.map(attrs => <GlobalTooltip {...attrs} />)}
      </Fragment>
    )
  }
})
