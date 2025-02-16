<template>
  <h2>水表</h2>
  <showTable
    :table-config="waterTableColumns"
    :table-data="waterTableData"
    :pager="pager"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import showTable from "@/components/showTable.vue";
import { ref } from "vue";
import recordApi from "@/api/recordApi";
import { RecordType } from "@/enums/record";
import { useRoute } from "vue-router";
const route = useRoute();

const waterTableColumns = [
  { label: "日期", prop: "recordDate" },
  { label: "读数", prop: "reading", formatter: (val) => `${val} t` },
];

const waterTableData = ref([]);
const elecTableData = ref([]);

const pager = ref({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});
function initData() {
  waterTableData.value = [];
  elecTableData.value = [];
}
function handleCurrentChange() {
  queryData();
}
function handleSizeChange() {
  queryData();
}
function queryData() {
  // query water data
  recordApi
    .list(pager.value, { roomId: route.params.id, type: RecordType.water })
    .then((res) => {
      waterTableData.value = res.data.data;
      pager.value = res.data.pager;
    });
}
</script>
