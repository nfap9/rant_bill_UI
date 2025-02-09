<template>
  <el-table :data="tableData" stripe style="width: 100%" border>
    <template v-for="item in tableConfig">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :filters="item.filters"
        :filter-method="item.filterMethod"
        :sortable="item.sortable"
        show-overflow-tooltip
        :fixed="item.fixed"
      >
        <template #default="scope">
          <!-- 集合 -->
          <span v-if="item.type === 'gather'">
            <template v-for="tag in scope.row[item.prop]">
              <el-tag class="cell-tag" v-if="tag" type="primary">{{
                tag
              }}</el-tag>
            </template>
          </span>
          <span
            v-else-if="item.type === 'link'"
            class="active"
            @click="handleLinkClick(scope.row, item, item.prop)"
          >
            {{ scope.row[item.prop] ?? "--" }}
          </span>
          <span v-else-if="item.type === 'options'">
            <el-button
              v-for="btn in item.buttons"
              type="text"
              @click="btn.callback(scope.row)"
            >
              {{ btn.text }}
            </el-button>
          </span>
          <!-- 普通文本 -->
          <span v-else-if="item.mapping">{{
            item.mapping(scope.row[item.prop]) ?? "--"
          }}</span>
          <span v-else>{{ scope.row[item.prop] ?? "--" }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <el-pagination
    v-if="showPager"
    class="pager"
    :current-page="props.pager?.pageIndex"
    :page-size="props.pager?.pageSize"
    :total="props.pager?.total"
    :page-sizes="[10, 20, 30, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script setup lang="ts">
import { Pager } from "@/types/common";
type Props = {
  tableConfig: Array<any>;
  tableData: Array<any>;
  showPager?: boolean;
  pager?: Pager;
};
const props = withDefaults(defineProps<Props>(), {
  tableConfig: () => [],
  tableData: () => [],
  showPager: true,
  pager: () => ({
    pageSize: 10,
    pageIndex: 1,
    total: 0,
  }),
});
const emits = defineEmits(["sizeChange", "currentChange"]);
const handleLinkClick = (row, columnConfig, prop) => {
  const clickCallback = columnConfig.callback;
  if (!clickCallback || typeof clickCallback !== "function") {
    return;
  }
  clickCallback(row);
};
const handleCurrentChange = (pageIndex) => {
  emits("currentChange", pageIndex);
};
const handleSizeChange = (pageSize) => {
  emits("sizeChange", pageSize);
};
</script>

<style lang="less" scoped>
.cell-tag {
  margin-right: 5px;
}
.active {
  color: blue;
  cursor: pointer;
}
.pager {
  margin-top: 32px;
}
</style>
