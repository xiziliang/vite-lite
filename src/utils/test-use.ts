import { ref, Ref, unref, computed } from "vue";
import { useAutoAnimate } from "@formkit/auto-animate/vue";

export function testPromise() {
  function returnPromise() {
    return new Promise((resolve, reject) => {
      // resolve("hahha");
      reject("失败");
    });
  };

  function promiseMiddleWare<T>(promise: Promise<T>): Promise<any[]> {
    return promise.then((data) => [null, data]).catch((err) => [err, undefined]);
  }

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
