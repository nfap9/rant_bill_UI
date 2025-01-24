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
      >
        <template #default="scope">
          <!-- 集合 -->
          <span v-if="item.type === 'gather'">
            <template v-for="tag in scope.row[item.prop].split(';')">
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
          <!-- 普通文本 -->
          <span v-else>{{ scope.row[item.prop] ?? "--" }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["tableConfig", "tableData"]);

const handleLinkClick = (row, columnConfig, prop) => {
  const clickCallback = columnConfig.callback;
  if (!clickCallback || typeof clickCallback !== "function") {
    return;
  }
  clickCallback(row);
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
</style>
