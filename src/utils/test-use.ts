import { ref, Ref, unref } from "vue";
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
    console.log(error);
    console.log(res);
  };

  return {
    promiseTest,
  }
}

export function testAutoAnimate() {

  const lengthArr = ref(new Array(50).fill(null).map((x, i) => i + 1));

  const isSelected = ref(1);
  const onHandleClick = (item?: any) => {
    isSelected.value = item;
  };

  const isEnable = ref(true);
  const [animateRef, enable] = useAutoAnimate({
    duration: 300,
  });

  const toggle = () => {
    isEnable.value = !isEnable.value;

    isEnable.value ? enable(true) : enable(false);
  };

  const reDisruptSort = (length: Ref<number[]> | number[]) => {
    lengthArr.value = unref(length).sort(() => Math.random() >= 0.5 ? 1 : -1);
  }

  return {
    isSelected,
    isEnable,
    length: lengthArr,
    animateRef,

    toggle,
    onHandleClick,
    reDisruptSort,
  }
}
