import { ref, Ref, unref, computed, watch } from "vue";
import { useAutoAnimate } from "@formkit/auto-animate/vue";

export async function promiseMiddleWare<T>(promise: Promise<T>): Promise<any[]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, undefined];
  }
}

export function testPromise() {
  function returnPromise() {
    return new Promise((resolve, reject) => {
      // resolve("hahha");
      reject("失败");
    });
  };

  const promiseTest = async () => {
    const [error, res] = await promiseMiddleWare(returnPromise());
  };

  return {
    promiseTest,
  }
}

interface TestItem {
  id: number;
}

export function testAutoAnimate() {
  const lengthArr = ref<TestItem[]>(new Array(50).fill(null).map((x, i) => ({ id: i + 1 })));

  const isSelected = ref(1);
  const onHandleClick = (item: TestItem) => {
    isSelected.value = item.id;
  };

  const isEnable = ref(true);
  const [animateRef, enable] = useAutoAnimate({
    duration: 300,
  });

  const toggle = () => {
    isEnable.value = !isEnable.value;

    isEnable.value ? enable(true) : enable(false);
  };

  const reDisruptSort = (length: Ref<TestItem[]> | TestItem[]) => {
    lengthArr.value = unref(length).sort(() => Math.random() >= 0.5 ? 1 : -1);
  }

  const onHandleDel = (index: number) => {
    lengthArr.value.splice(index, 1);
  };

  const onHandleAdd = () => {
    lengthArr.value.push({
      id: Math.max(...lengthArr.value.map(x => x.id)) + 1,
    })
  }

  return {
    isSelected,
    isEnable,
    length: lengthArr,
    animateRef,

    toggle,
    onHandleClick,
    /** 乱序 */
    reDisruptSort,
    /** 删除 */
    onHandleDel,
    /** 添加一个元素 */
    onHandleAdd,
  }
}

function* tree2array(nodes: any[]): any {
  for (const node of nodes) {
    yield node;
    if (node.children) yield* tree2array(node.children);
  }
}

export function testGenerator<T>(data: T[] | Ref<T[]>) {
  const tree = computed(() => unref(data));
  const array = computed(() => [...tree2array(tree.value)]);

  return {
    /** 树结构 */
    tree,
    /** 由树结构转的数组结构 */
    array,
  }
}

export function useLoading() {
  const loading = ref(false);

  watch(loading, (value) => {
    if (value) {
      const appEl = document.getElementById("app");
      if (document.getElementsByClassName('global-loading')[0]) return;

      const loadingEl = document.createElement('div');
      loadingEl.classList.add('global-loading');

      const style = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
      `;
      const loadingIcon = `
        <div>
          <span>
            <svg class="global-loading-icon" data-icon="loading" width="1em" height="1em" fill="#0073E5"
              aria-hidden="true" viewBox="0 0 48 48">
              <defs>
                <linearGradient id="a" x1="5.15%" x2="88.64%" y1="37.66%" y2="58.8%">
                  <stop offset="0%" stop-opacity=".5" stop-color="#0073E5"></stop>
                  <stop offset="100%" stop-opacity="0" stop-color="#0073E5"></stop>
                </linearGradient>
                <linearGradient id="b" x1="5.2%" x2="100%" y1="100%" y2="100%">
                  <stop offset="0%" stop-opacity=".5" stop-color="#0073E5"></stop>
                  <stop offset="100%" stop-color="#0073E5"></stop>
                </linearGradient>
              </defs>
              <g fill-rule="evenodd">
                <rect fill-opacity="0" height="48" width="48"></rect>
                <g fill-rule="nonzero">
                  <path
                    d="M43.7474824,18.6580143 C43.915214,19.7576754 44,20.8739108 44,22 C44,34.1502645 34.1502645,44 22,44 C9.97630076,44 0.205452446,34.3543986 0.00319776139,22.3789384 L0,22 L4.4,22 C4.4,31.7202116 12.2797884,39.6 22,39.6 C31.7202116,39.6 39.6,31.7202116 39.6,22 C39.6,21.2769663 39.5565185,20.5599109 39.4703797,19.8513053 L39.3977903,19.3214741 L43.7474824,18.6580143 Z"
                    transform="translate(2.000000, 2.000000)" fill="url(#a)"></path>
                  <path
                    d="M22,0 C32.9052648,0 42.1192923,7.98347746 43.7474824,18.6580143 C43.8816677,19.5377432 43.9627678,20.4280796 43.9898404,21.3255827 L44,22 C43.9994579,23.2155685 43.0146921,24.2 41.8,24.2 C40.5849736,24.2 39.6,23.2150264 39.6,22 C39.6,21.9939434 39.6000245,21.9878925 39.6000733,21.9818474 L39.6,22 C39.6,21.0962079 39.5320601,20.2017569 39.3977903,19.3214741 C38.0961966,10.7881275 30.7234216,4.4 22,4.4 C12.3955052,4.4 4.58787484,12.0932911 4.40334006,21.6536423 L4.4,22 L0,22 C0,9.8497355 9.8497355,0 22,0 Z"
                    transform="translate(2.000000, 2.000000)" fill="url(#b)"></path>
                </g>
              </g>
            </svg>
          </span>
          <div style="color: #0073E5">Loading...</div>
        </div>
      `;

      loadingEl.setAttribute('style', style);
      loadingEl.innerHTML = loadingIcon;
      appEl?.appendChild(loadingEl);
    } else {
      const loadingEl = document.getElementsByClassName('global-loading')[0];

      if (loadingEl) {
        loadingEl.remove();
      }
    }
  }, { immediate: true })

  return {
    loading,
  }
}
