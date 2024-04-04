<template>
  <div
    class="relative"
    ref="containerRef"
    :style="{
      height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }"
  >
    <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 可以给一个加载中的描述，没有也无所谓 -->
    <div v-else>加载中...</div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgElements,
  getAllImg,
  onCompleteImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'
// 定义props
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 节点的唯一标识 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 想要计算 总高度，那么需要计算出 每一列的高度 ，最高的一列为 总高度
// 想要计算列宽，那么首先需要有容器的总宽度：

// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器。key 所在列 val 列高 【我这里用数组试一下】
const columnHeightArr = ref([])
/**
 * 构建记录各列高度的数组
 */
const useColumnHeightArr = () => {
  columnHeightArr.value = new Array(props.column).fill(0)
}
// 容器实例
const containerRef = ref(null)
// 容器总宽度（不包含padding.margin.border）
const containerWidth = ref(0)
// 容器左边距，计算 item left 时，需要使用定位
const containerLeft = ref(0)
/**
 * 计算容易宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value =
    containerRef.value.clientWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

/**
 * 计算每列的宽度
 */
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
// 计算
const useColumnWidth = () => {
  // 获取容易宽度
  useContainerWidth()
  // 计算列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
})

// item 高度集合
let cardHeights = []
// 监听图片加载完成
const waitImgComplete = async () => {
  cardHeights = []
  // 拿到所有元素
  const cardElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取所有元素下 img 标签
  const imgElements = getImgElements(cardElements)
  // 获取所有 img 标签的图片
  const allImgs = getAllImg(imgElements)
  // 预读取图片,图片加载完成
  await onCompleteImgs(allImgs)
  // 遍历所有元素，得到元素的高度
  cardElements.forEach((el) => {
    cardHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
/**
 * 图片不需要预加载时，计算 item 高度
 */
const useCardHeight = () => {
  cardHeights = []
  // 拿到所有元素
  let cardElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 计算 item 高度
  cardElements.forEach((el) => {
    // 依据传入数据计算出的 img 高度(这里应该时通过后台拿取图片高度数据，而这里能这么拿到，应该是因为nextTick的原因)
    cardHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

watch(
  () => props.data,
  (val) => {
    // 重置数据源
    const resetColumnHeight = val.every((item) => !item._style)
    if (resetColumnHeight) {
      // 构建高度记录容器
      useColumnHeightArr()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplete()
      } else {
        useCardHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
/**
 * 监听列数变化，重新构建瀑布流
 */
const reset = () => {
  // 延迟 100 毫秒，否则会导致宽度计算不正确 （100ms 偶尔也会不准确）
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 200)
}
/** 监听列数变化 */
watch(
  () => props.column,
  (val) => {
    // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
    if (props.picturePreReading) {
      columnWidth.value = 0
      nextTick(reset)
    } else {
      reset()
    }
  }
)

/**
 * 为每个 item 生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    //  避免重复计算
    if (item._style) return

    // 生成 _style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()

    // 指定列高度自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightArr.value)
}

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
  // 最小高度所在的列 * （列宽 + 间距）
  const colIndex = getMinHeightColumn(columnHeightArr.value)
  return (
    colIndex * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}
/**
 * 返回下一个 item 的top
 */
const getItemTop = () => {
  // 列高数组中最小高度
  return getMinHeight(columnHeightArr.value)
}
/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  // 最小高度所在的列
  const colIndex = getMinHeightColumn(columnHeightArr.value)
  // 该列高度自增
  columnHeightArr.value[colIndex] += cardHeights[index] + props.rowSpacing
}

/**
 * 在组件销毁时，清除所有的 _style
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
</script>
<style lang="scss" scoped></style>
