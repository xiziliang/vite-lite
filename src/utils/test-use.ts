import { ref } from "vue";
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
  const length = ref(new Array(10).fill(null).map((x, i) => i + 1));

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

  return {
    isSelected,
    isEnable,
    length,
    animateRef,

    toggle,
    onHandleClick,
  }
}
